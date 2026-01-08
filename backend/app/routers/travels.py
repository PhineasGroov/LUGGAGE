from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy.orm import exc as orm_exc
from typing import List, Annotated
import os
import uuid
from pathlib import Path

from app.schemas import travel as travel_schema
from app.schemas.travel_document import TravelDocumentResponse
from app.models import user as user_model, travel as travel_model
from app.models.travel_document import TravelDocument, DocumentType, VerificationStatus
from app.models.travel import TravelStatus
from app.routers.users import get_current_user
from app.database.session import get_db_with_rls

router = APIRouter()

UPLOAD_DIR = Path("/app/uploads/travel_documents")

def get_db_for_user(current_user: user_model.User = Depends(get_current_user)):
    """Get database session with RLS context"""
    yield from get_db_with_rls(current_user.id)

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
    
    try:
        db.commit()
        db.refresh(db_travel)
    except orm_exc.StaleDataError:
        # RLS blocked the update - user doesn't own this travel
        db.rollback()
        raise HTTPException(status_code=403, detail="Access denied: You can only update your own travels")
    
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
    try:
        db.commit()
    except orm_exc.StaleDataError:
        # RLS blocked the delete - user doesn't own this travel
        db.rollback()
        raise HTTPException(status_code=403, detail="Access denied: You can only delete your own travels")
    
    return None

@router.post("/{travel_id}/documents/upload", response_model=TravelDocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_travel_document(
    travel_id: int,
    document_type: DocumentType,
    file: UploadFile = File(...),
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Upload a travel document (plane ticket, etc.) for verification"""
    # Check travel exists and belongs to user
    db_travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id,
        travel_model.Travel.traveler_id == current_user.id
    ).first()
    
    if not db_travel:
        raise HTTPException(status_code=404, detail="Travel not found or access denied")
    
    if db_travel.status not in [TravelStatus.DRAFT, TravelStatus.REJECTED]:
        raise HTTPException(status_code=400, detail="Can only upload documents for DRAFT or REJECTED travels")
    
    # Validate file type
    allowed_extensions = {".pdf", ".jpg", ".jpeg", ".png"}
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {allowed_extensions}")
    
    # Create unique filename
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Create database record
    db_document = TravelDocument(
        travel_id=travel_id,
        document_type=document_type,
        file_path=str(file_path),
        original_filename=file.filename,
        verification_status=VerificationStatus.PENDING
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return db_document

@router.post("/{travel_id}/submit-for-verification", response_model=travel_schema.TravelResponse)
def submit_travel_for_verification(
    travel_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Submit travel for admin verification after uploading documents"""
    db_travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id,
        travel_model.Travel.traveler_id == current_user.id
    ).first()
    
    if not db_travel:
        raise HTTPException(status_code=404, detail="Travel not found or access denied")
    
    if db_travel.status != TravelStatus.DRAFT:
        raise HTTPException(status_code=400, detail="Only DRAFT travels can be submitted for verification")
    
    # Check if at least one document uploaded
    doc_count = db.query(TravelDocument).filter(
        TravelDocument.travel_id == travel_id
    ).count()
    
    if doc_count == 0:
        raise HTTPException(status_code=400, detail="Must upload at least one document before submitting")
    
    db_travel.status = TravelStatus.PENDING_VERIFICATION
    
    try:
        db.commit()
        db.refresh(db_travel)
    except orm_exc.StaleDataError:
        db.rollback()
        raise HTTPException(status_code=403, detail="Access denied")
    
    return db_travel

@router.get("/{travel_id}/documents", response_model=List[TravelDocumentResponse])
def get_travel_documents(
    travel_id: int,
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db_for_user)
):
    """Get all documents for a travel (only owner can view)"""
    db_travel = db.query(travel_model.Travel).filter(
        travel_model.Travel.id == travel_id,
        travel_model.Travel.traveler_id == current_user.id
    ).first()
    
    if not db_travel:
        raise HTTPException(status_code=404, detail="Travel not found or access denied")
    
    documents = db.query(TravelDocument).filter(
        TravelDocument.travel_id == travel_id
    ).all()
    
    return documents