from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.orm import exc as orm_exc
from typing import List

from app.schemas import package as package_schema
from app.models import user as user_model, package as package_model, travel as travel_model
from app.database.session import get_db_with_rls
from app.routers.users import get_current_user

router = APIRouter()

def get_db_for_user(current_user: user_model.User = Depends(get_current_user)):
    """Get database session with RLS context"""
    yield from get_db_with_rls(current_user.id)

@router.post("/", response_model=package_schema.Package, status_code=status.HTTP_201_CREATED)
def create_package(
    package: package_schema.PackageCreate,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Crée un nouveau colis pour l'utilisateur actuellement connecté.
    """
    db_package = package_model.Package(**package.model_dump(), sender_id=current_user.id)
    db.add(db_package)
    db.commit()
    db.refresh(db_package)
    return db_package

@router.get("/", response_model=List[package_schema.Package])
def read_packages(
    skip: int = 0, 
    limit: int = 100, 
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Récupère une liste de tous les colis.
    """
    packages = db.query(package_model.Package).offset(skip).limit(limit).all()
    return packages

@router.get("/my-packages", response_model=List[package_schema.Package])
def read_my_packages(
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Récupère les colis de l'utilisateur connecté.
    """
    packages = db.query(package_model.Package).filter(
        package_model.Package.sender_id == current_user.id
    ).all()
    return packages

@router.patch("/{package_id}/request-travel/{travel_id}", response_model=package_schema.Package)
def request_travel_for_package(
    package_id: int,
    travel_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Sender requests a specific travel for their package.
    Changes package status to PENDING and assigns travel_id.
    """
    # Verify the package exists and belongs to current user
    package = db.query(package_model.Package).filter(
        package_model.Package.id == package_id
    ).first()
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Check ownership (will also be enforced by RLS on update)
    if package.sender_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only request travel for your own packages"
        )
    
    # Verify the travel exists
    travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id
    ).first()
    
    if not travel:
        raise HTTPException(status_code=404, detail="Travel not found")
    
    # Check if package is in correct status
    if package.status not in [package_model.PackageStatus.AVAILABLE, package_model.PackageStatus.CANCELED]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Package must be AVAILABLE or CANCELED to request travel. Current status: {package.status}"
        )
    
    # Check capacity before requesting
    current_weight = sum(p.weight_kg for p in travel.packages if p.status == package_model.PackageStatus.ACCEPTED)
    if current_weight + package.weight_kg > getattr(travel, "capacity_kg"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package would exceed travel capacity"
        )
    
    # Request the travel
    setattr(package, "travel_id", travel_id)
    setattr(package, "status", package_model.PackageStatus.PENDING)
    
    try:
        db.commit()
        db.refresh(package)
    except orm_exc.StaleDataError:
        db.rollback()
        raise HTTPException(status_code=403, detail="Access denied: You can only update your own packages")
    
    return package


@router.patch("/{package_id}/accept", response_model=package_schema.Package)
def accept_package(
    package_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Traveler accepts a package that was requested for their travel.
    Changes package status from PENDING to ACCEPTED.
    """
    # Get the package
    package = db.query(package_model.Package).filter(
        package_model.Package.id == package_id
    ).first()
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Verify package has a travel assigned
    if not package.travel_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package has no travel request"
        )
    
    # Get the travel
    travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == package.travel_id
    ).first()
    
    if not travel:
        raise HTTPException(status_code=404, detail="Travel not found")
    
    # Verify current user is the traveler
    if getattr(travel, "traveler_id") != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the travel owner can accept packages"
        )
    
    # Verify package is in PENDING status
    if package.status != package_model.PackageStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Package must be PENDING to accept. Current status: {package.status}"
        )
    
    # Final capacity check
    current_weight = sum(p.weight_kg for p in travel.packages if p.status == package_model.PackageStatus.ACCEPTED)
    if current_weight + package.weight_kg > getattr(travel, "capacity_kg"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package would exceed travel capacity"
        )
    
    # Accept the package
    setattr(package, "status", package_model.PackageStatus.ACCEPTED)
    
    db.commit()
    db.refresh(package)
    return package


@router.patch("/{package_id}/reject", response_model=package_schema.Package)
def reject_package(
    package_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Traveler rejects a package request.
    Changes status back to AVAILABLE and removes travel_id.
    """
    # Get the package
    package = db.query(package_model.Package).filter(
        package_model.Package.id == package_id
    ).first()
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Verify package has a travel assigned
    if not package.travel_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package has no travel request"
        )
    
    # Get the travel
    travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == package.travel_id
    ).first()
    
    if not travel:
        raise HTTPException(status_code=404, detail="Travel not found")
    
    # Verify current user is the traveler
    if getattr(travel, "traveler_id") != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the travel owner can reject packages"
        )
    
    # Verify package is in PENDING status
    if package.status != package_model.PackageStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Package must be PENDING to reject. Current status: {package.status}"
        )
    
    # Reject: change status to CANCELED (sender can then cancel-request to make it AVAILABLE again)
    setattr(package, "status", package_model.PackageStatus.CANCELED)
    
    db.commit()
    db.refresh(package)
    return package


@router.patch("/{package_id}/cancel-request", response_model=package_schema.Package)
def cancel_travel_request(
    package_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Sender cancels their travel request (while still PENDING).
    Changes status back to AVAILABLE and removes travel_id.
    """
    # Get the package
    package = db.query(package_model.Package).filter(
        package_model.Package.id == package_id
    ).first()
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Check ownership
    if package.sender_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only cancel requests for your own packages"
        )
    
    # Verify package is in PENDING or CANCELED status
    if package.status not in [package_model.PackageStatus.PENDING, package_model.PackageStatus.CANCELED]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Can only cancel PENDING or CANCELED requests. Current status: {package.status}"
        )
    
    # Cancel the request
    setattr(package, "status", package_model.PackageStatus.AVAILABLE)
    setattr(package, "travel_id", None)
    
    try:
        db.commit()
        db.refresh(package)
    except orm_exc.StaleDataError:
        db.rollback()
        raise HTTPException(status_code=403, detail="Access denied: You can only update your own packages")
    
    return package