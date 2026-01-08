from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base
from datetime import datetime
import enum

class PackageStatus(str, enum.Enum):
    AVAILABLE = "available"  # Package created, no travel requested yet
    PENDING = "pending"      # Sender requested a travel, waiting for traveler approval
    ACCEPTED = "accepted"    # Traveler accepted the package
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    CANCELED = "canceled"

class Package(Base):
    __tablename__  = "packages"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    weight_kg = Column(Float, nullable=False)
    dimensions = Column(String, nullable=False)  # e.g., "30x20
    status = Column(Enum(PackageStatus), default=PackageStatus.AVAILABLE, nullable=False)

    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    travel_id = Column(Integer, ForeignKey("travels.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    sender = relationship("User", back_populates="sent_packages")
    travel = relationship("Travel", back_populates="packages")
    travel_requests = relationship("PackageRequest", back_populates="package", cascade="all, delete-orphan")