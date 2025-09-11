from pydantic import BaseModel
from datetime import date
from typing import Optional
from app.models.package import PackageStatus
from .user import User as UserSchema
from .travel import Travel as TravelSchema

class PackageBase(BaseModel):
    description: str
    weight_kg: float
    dimensions: str  # e.g., "30x20x15"

class PackageCreate(PackageBase):
    pass

class PackageUpdate(BaseModel):
    description: Optional[str] = None
    weight_kg: Optional[float] = None
    dimensions: Optional[str] = None
    status: Optional[PackageStatus] = None
    travel_id: Optional[int] = None

class Package(PackageBase):
    id: int
    sender_id: int
    travel_id: Optional[int] = None
    status: PackageStatus
    sender: UserSchema
    travel: Optional[TravelSchema] = None

    class Config:
        from_attributes = True