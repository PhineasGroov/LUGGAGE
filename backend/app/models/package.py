from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
from app.database.base import Base
import enum

class PackageStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    CANCELED = "canceled"

class Package(Base):
    __tablename__  = "packages"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    weight_kg = Column(Float, nullable=False)
    dimensions = Column(String, nullable=False)  # e.g., "30x20
    status = Column(Enum(PackageStatus), default=PackageStatus.PENDING, nullable=False)

    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    travel_id = Column(Integer, ForeignKey("travels.id"), nullable=True)

    sender = relationship("User", back_populates="sent_packages")
    travel = relationship("Travel", back_populates="packages")