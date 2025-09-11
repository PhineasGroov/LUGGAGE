from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas import travel as travel_schema
from app.models import user as user_model, travel as travel_model
from app.routers.auth import get_db
from app.routers.users import get_current_user

router = APIRouter()

@router.post("/", response_model=travel_schema.Travel, status_code=status.HTTP_201_CREATED)
def create_travel(
    travel: travel_schema.TravelCreate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Crée un nouveau voyage pour l'utilisateur actuellement connecté.
    L'utilisateur doit avoir le rôle 'traveler'.
    """
    if getattr(current_user, "role", None) != user_model.UserRole.TRAVELER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only users with the 'traveler' role can create travels."
        )
    
    db_travel = travel_model.Travel(**travel.model_dump(), traveler_id=current_user.id)
    db.add(db_travel)
    db.commit()
    db.refresh(db_travel)
    return db_travel

@router.get("/", response_model=List[travel_schema.Travel])
def read_travels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Récupère une liste de tous les voyages disponibles.
    Cet endpoint est public.
    """
    travels = db.query(travel_model.Travel).offset(skip).limit(limit).all()
    return travels