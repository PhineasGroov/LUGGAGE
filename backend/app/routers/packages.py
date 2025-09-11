from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import package as package_schema
from app.models import user as user_model, package as package_model, travel as travel_model
from app.routers.auth import get_db
from app.routers.users import get_current_user

router = APIRouter()

@router.post("/", response_model=package_schema.Package, status_code=status.HTTP_201_CREATED)
def create_package(
    package: package_schema.PackageCreate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Crée un nouveau colis pour l'utilisateur actuellement connecté.
    L'utilisateur doit avoir le rôle 'sender'.
    """
    if str(current_user.role) != user_model.UserRole.SENDER.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only users with the 'sender' role can create packages."
        )
    
    db_package = package_model.Package(**package.model_dump(), sender_id=current_user.id)
    db.add(db_package)
    db.commit()
    db.refresh(db_package)
    return db_package

@router.get("/", response_model=List[package_schema.Package])
def read_packages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Récupère une liste de tous les colis.
    """
    packages = db.query(package_model.Package).offset(skip).limit(limit).all()
    return packages

@router.get("/my-packages", response_model=List[package_schema.Package])
def read_my_packages(
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Récupère les colis de l'utilisateur connecté.
    """
    packages = db.query(package_model.Package).filter(
        package_model.Package.sender_id == current_user.id
    ).all()
    return packages

@router.patch("/{package_id}/assign-travel", response_model=package_schema.Package)
def assign_package_to_travel(
    package_id: int,
    travel_id: int,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Assigne un colis à un voyage.
    Seul le voyageur du voyage peut accepter un colis.
    """
    # Vérifier que le voyage existe
    travel = db.query(travel_model.Travel).filter(travel_model.Travel.id == travel_id).first()
    if not travel:
        raise HTTPException(status_code=404, detail="Travel not found")
    
    # Vérifier que l'utilisateur actuel est le voyageur de ce voyage
    if getattr(travel, "traveler_id") != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the traveler can accept packages for their travel"
        )
    
    # Vérifier que le colis existe
    package = db.query(package_model.Package).filter(package_model.Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Vérifier que le colis n'est pas déjà assigné
    if package.travel_id is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package is already assigned to a travel"
        )
    
    # Vérifier la capacité (simple vérification du poids)
    current_weight = sum(p.weight_kg for p in travel.packages if p.id != package_id)
    if current_weight + package.weight_kg > getattr(travel, "capacity_kg"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package exceeds travel capacity"
        )
    
    # Assigner le colis au voyage
    setattr(package, "travel_id", travel_id)
    setattr(package, "status", package_model.PackageStatus.ACCEPTED)

    db.commit()
    db.refresh(package)
    return package