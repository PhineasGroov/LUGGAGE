from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import travel as travel_schema
from app.models import user as user_model, travel as travel_model
from app.routers.users import get_current_user
from app.database.session import get_db_with_rls

router = APIRouter()

def get_db_for_user(current_user: user_model.User = Depends(get_current_user)):
    """Get database session with RLS context"""
    return next(get_db_with_rls(current_user.id))

@router.post("/", response_model=travel_schema.Travel, status_code=status.HTTP_201_CREATED)
def create_travel(
    travel: travel_schema.TravelCreate,
    db: Session = Depends(get_db_for_user),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Crée un nouveau voyage pour l'utilisateur actuellement connecté.
    """
    db_travel = travel_model.Travel(**travel.model_dump(), traveler_id=current_user.id)
    db.add(db_travel)
    db.commit()
    db.refresh(db_travel)
    return db_travel

@router.get("/", response_model=List[travel_schema.Travel])
def read_travels(
    skip: int = 0, 
    limit: int = 100, 
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """
    Récupère une liste de tous les voyages disponibles.
    Cet endpoint est public.
    """
    travels = db.query(travel_model.Travel).offset(skip).limit(limit).all()
    return travels

@router.get("/my-travels", response_model=List[travel_schema.Travel])
def read_my_travels(
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Get only current user's travels"""
    travels = db.query(travel_model.Travel).filter(
        travel_model.Travel.traveler_id == current_user.id
    ).all()
    return travels

@router.put("/{travel_id}", response_model=travel_schema.Travel)
def update_travel(
    travel_id: int,
    travel: travel_schema.TravelCreate,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Update travel (RLS ensures only owner can update)"""
    db_travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id
    ).first()
    
    if not db_travel:
        raise HTTPException(status_code=404, detail="Travel not found or access denied")
    
    for key, value in travel.model_dump().items():
        setattr(db_travel, key, value)
    
    db.commit()
    db.refresh(db_travel)
    return db_travel

@router.delete("/{travel_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_travel(
    travel_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Delete travel (RLS ensures only owner can delete)"""
    db_travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id
    ).first()
    
    if not db_travel:
        raise HTTPException(status_code=404, detail="Travel not found or access denied")
    
    db.delete(db_travel)
    db.commit()
    return None