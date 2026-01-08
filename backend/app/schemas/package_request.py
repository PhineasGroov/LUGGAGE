from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.package_request import RequestStatus

class PackageRequestBase(BaseModel):
    pass

class PackageRequestCreate(PackageRequestBase):
    travel_id: int

class PackageRequestResponse(PackageRequestBase):
    id: int
    package_id: int
    travel_id: int
    status: RequestStatus
    responded_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
