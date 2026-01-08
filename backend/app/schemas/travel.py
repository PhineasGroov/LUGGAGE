from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
from .user import User as UserSchema
from app.models.travel import TravelStatus

class TravelBase(BaseModel):
    origin: str
    destination: str
    travel_date: date
    capacity_kg: float

class TravelCreate(TravelBase):
    pass

class TravelUpdate(BaseModel):
    origin: Optional[str] = None
    destination: Optional[str] = None
    travel_date: Optional[date] = None
    capacity_kg: Optional[float] = None

class Travel(TravelBase):
    id: int
    traveler_id: int
    traveler: UserSchema

    class Config:
        from_attributes = True

class TravelResponse(TravelBase):
    id: int
    traveler_id: int
    status: TravelStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True