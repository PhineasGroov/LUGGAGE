from sqlalchemy import Boolean, Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.database.base import Base
import enum

class UserRole(str, enum.Enum):
    SENDER = "sender"
    TRAVELER = "traveler"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.SENDER)

    # Relationship to Travel model
    travels = relationship("Travel", back_populates="traveler")
    sent_packages = relationship("Package", back_populates="sender")