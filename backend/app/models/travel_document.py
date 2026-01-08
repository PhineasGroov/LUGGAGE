from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base
from datetime import datetime
import enum

class DocumentType(str, enum.Enum):
    PLANE_TICKET = "plane_ticket"
    TRAIN_TICKET = "train_ticket"
    BUS_TICKET = "bus_ticket"
    PASSPORT = "passport"
    OTHER = "other"

class VerificationStatus(str, enum.Enum):
    PENDING = "pending"          # Uploaded, waiting for admin review
    APPROVED = "approved"        # Admin approved
    REJECTED = "rejected"        # Admin rejected

class TravelDocument(Base):
    """Store travel proof documents (plane tickets, etc.)"""
    __tablename__ = "travel_documents"

    id = Column(Integer, primary_key=True, index=True)
    travel_id = Column(Integer, ForeignKey("travels.id"), nullable=False)
    document_type = Column(Enum(DocumentType), default=DocumentType.PLANE_TICKET, nullable=False)
    file_path = Column(String, nullable=False)  # Local file path or cloud URL
    original_filename = Column(String, nullable=False)
    
    # Verification fields
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False)
    verified_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    rejection_reason = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    travel = relationship("Travel", back_populates="documents")
    verified_by = relationship("User", foreign_keys=[verified_by_id])
