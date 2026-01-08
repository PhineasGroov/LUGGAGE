from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.models import user as user_model
from app.models.travel_document import TravelDocument, VerificationStatus
from app.models.travel import Travel, TravelStatus
from app.schemas.travel_document import TravelDocumentResponse, DocumentVerificationAction
from app.schemas.travel import TravelResponse
from app.routers.users import get_current_user
from app.database.session import get_db_with_rls
from datetime import datetime

router = APIRouter()

def require_admin(current_user: user_model.User = Depends(get_current_user)):
    """Dependency to ensure user is admin"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

def get_db_for_admin(current_user: user_model.User = Depends(require_admin)):
    """Get database session with RLS context for admin"""
    yield from get_db_with_rls(current_user.id)

@router.get("/documents/pending", response_model=List[TravelDocumentResponse])
def get_pending_documents(
    current_user: user_model.User = Depends(require_admin),
    db: Session = Depends(get_db_for_admin)
):
    """Get all pending travel documents for verification"""
    documents = db.query(TravelDocument).filter(
        TravelDocument.verification_status == VerificationStatus.PENDING
    ).all()
    return documents

@router.post("/documents/{document_id}/approve", response_model=TravelDocumentResponse)
def approve_document(
    document_id: int,
    current_user: user_model.User = Depends(require_admin),
    db: Session = Depends(get_db_for_admin)
):
    """Approve a travel document and potentially open the travel"""
    document = db.query(TravelDocument).filter(
        TravelDocument.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.verification_status != VerificationStatus.PENDING:
        raise HTTPException(status_code=400, detail="Document is not pending verification")
    
    # Approve document
    document.verification_status = VerificationStatus.APPROVED
    document.verified_by_id = current_user.id
    document.verified_at = datetime.utcnow()
    
    # Check if all documents for this travel are approved
    travel = db.query(Travel).filter(Travel.id == document.travel_id).first()
    all_documents = db.query(TravelDocument).filter(
        TravelDocument.travel_id == document.travel_id
    ).all()
    
    all_approved = all(doc.verification_status == VerificationStatus.APPROVED for doc in all_documents)
    
    if all_approved and travel.status == TravelStatus.PENDING_VERIFICATION:
        travel.status = TravelStatus.VERIFIED
    
    db.commit()
    db.refresh(document)
    
    return document

@router.post("/documents/{document_id}/reject", response_model=TravelDocumentResponse)
def reject_document(
    document_id: int,
    action: DocumentVerificationAction,
    current_user: user_model.User = Depends(require_admin),
    db: Session = Depends(get_db_for_admin)
):
    """Reject a travel document and set travel back to DRAFT"""
    document = db.query(TravelDocument).filter(
        TravelDocument.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.verification_status != VerificationStatus.PENDING:
        raise HTTPException(status_code=400, detail="Document is not pending verification")
    
    if not action.rejection_reason:
        raise HTTPException(status_code=400, detail="Rejection reason is required")
    
    # Reject document
    document.verification_status = VerificationStatus.REJECTED
    document.verified_by_id = current_user.id
    document.verified_at = datetime.utcnow()
    document.rejection_reason = action.rejection_reason
    
    # Set travel back to REJECTED status
    travel = db.query(Travel).filter(Travel.id == document.travel_id).first()
    if travel.status == TravelStatus.PENDING_VERIFICATION:
        travel.status = TravelStatus.REJECTED
    
    db.commit()
    db.refresh(document)
    
    return document

@router.get("/travels/pending-verification", response_model=List[TravelResponse])
def get_travels_pending_verification(
    current_user: user_model.User = Depends(require_admin),
    db: Session = Depends(get_db_for_admin)
):
    """Get all travels awaiting verification"""
    travels = db.query(Travel).filter(
        Travel.status == TravelStatus.PENDING_VERIFICATION
    ).all()
    return travels

@router.post("/travels/{travel_id}/open", response_model=TravelResponse)
def open_travel(
    travel_id: int,
    current_user: user_model.User = Depends(require_admin),
    db: Session = Depends(get_db_for_admin)
):
    """Manually open a verified travel for package requests"""
    travel = db.query(Travel).filter(Travel.id == travel_id).first()
    
    if not travel:
        raise HTTPException(status_code=404, detail="Travel not found")
    
    if travel.status != TravelStatus.VERIFIED:
        raise HTTPException(status_code=400, detail="Can only open VERIFIED travels")
    
    travel.status = TravelStatus.OPEN
    db.commit()
    db.refresh(travel)
    
    return travel
