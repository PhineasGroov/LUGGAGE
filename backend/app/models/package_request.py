from sqlalchemy import Column, Integer, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base
from datetime import datetime
import enum

class RequestStatus(str, enum.Enum):
    PENDING = "pending"          # Sender requested, waiting for traveler
    ACCEPTED = "accepted"        # Traveler accepted this request
    REJECTED = "rejected"        # Traveler rejected
    CANCELLED = "cancelled"      # Sender cancelled request
    EXPIRED = "expired"          # Another traveler accepted first

class PackageRequest(Base):
    """
    Junction table for Package-Travel many-to-many relationship.
    Allows senders to request multiple travels for one package.
    """
    __tablename__ = "package_requests"

    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("packages.id"), nullable=False)
    travel_id = Column(Integer, ForeignKey("travels.id"), nullable=False)
    status = Column(Enum(RequestStatus), default=RequestStatus.PENDING, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    responded_at = Column(DateTime, nullable=True)  # When traveler accepted/rejected
    
    # Relationships
    package = relationship("Package", back_populates="travel_requests")
    travel = relationship("Travel", back_populates="package_requests")
