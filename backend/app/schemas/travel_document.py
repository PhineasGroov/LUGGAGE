from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.travel_document import DocumentType, VerificationStatus

class TravelDocumentBase(BaseModel):
    document_type: DocumentType

class TravelDocumentCreate(TravelDocumentBase):
    pass

class TravelDocumentResponse(TravelDocumentBase):
    id: int
    travel_id: int
    file_path: str
    original_filename: str
    verification_status: VerificationStatus
    verified_by_id: Optional[int] = None
    verified_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DocumentVerificationAction(BaseModel):
    """Admin action on document"""
    rejection_reason: Optional[str] = None
