from pydantic import BaseModel
from datetime import date
from .user import User as UserSchema

class TravelBase(BaseModel):
    origin: str
    destination: str
    travel_date: date
    capacity_kg: float

class TravelCreate(TravelBase):
    pass

class Travel(TravelBase):
    id: int
    traveler_id: int
    traveler: UserSchema

    class Config:
        from_attributes = True