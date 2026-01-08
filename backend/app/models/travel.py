from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base
from datetime import datetime
import enum

class TravelStatus(str, enum.Enum):
    DRAFT = "draft"                              # Creating travel, not published
    PENDING_VERIFICATION = "pending_verification"  # Submitted with docs, awaiting admin
    VERIFIED = "verified"                        # Admin approved documents  
    OPEN = "open"                                # Published, accepting package requests
    CLOSED = "closed"                            # Full capacity or no longer accepting
    IN_TRANSIT = "in_transit"                    # Travel in progress
    COMPLETED = "completed"                      # Travel finished
    REJECTED = "rejected"                        # Document verification failed
    CANCELLED = "cancelled"                      # Traveler cancelled

class Travel(Base):
    __tablename__ = "travels"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String, index=True, nullable=False)
    destination = Column(String, nullable=False)
    travel_date = Column(Date, nullable=False)
    capacity_kg = Column(Float, nullable=False)
    status = Column(Enum(TravelStatus), default=TravelStatus.DRAFT, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    traveler_id = Column(Integer, ForeignKey("users.id"))
    traveler = relationship("User", back_populates="travels")
    packages = relationship("Package", back_populates="travel")
    documents = relationship("TravelDocument", back_populates="travel", cascade="all, delete-orphan")
    package_requests = relationship("PackageRequest", back_populates="travel", cascade="all, delete-orphan")