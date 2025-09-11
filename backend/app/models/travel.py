from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class Travel(Base):
    __tablename__ = "travels"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String, index=True, nullable=False)
    destination = Column(String, nullable=False)
    travel_date = Column(Date, nullable=False)
    capacity_kg = Column(Float, nullable=False)

    traveler_id = Column(Integer, ForeignKey("users.id"))
    traveler = relationship("User", back_populates="travels")
    packages = relationship("Package", back_populates="travel")