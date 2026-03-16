from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PickupRequestBase(BaseModel):
    item_type: str
    weight_kg: float
    estimated_points: int
    address: str
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    notes: Optional[str] = None

class PickupRequestCreate(PickupRequestBase):
    pass

class PickupRequest(PickupRequestBase):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    status: str = "Pending"  # Pending, Accepted, PickedUp, Rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
