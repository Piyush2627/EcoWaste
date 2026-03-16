from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Literal
from app.models.user import PyObjectId

class EwasteListingBase(BaseModel):
    title: str
    description: str
    category: str
    weight_kg: float
    condition: Literal["used", "refurbished", "broken"] = "used"

class EwasteListingCreate(EwasteListingBase):
    pass

class EwasteListingInDB(EwasteListingBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: PyObjectId
    status: Literal["pending", "approved", "rejected"] = "pending"
    points_rewarded: int = 0

    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

class EwasteListingResponse(EwasteListingInDB):
    pass


class ProductBase(BaseModel):
    title: str
    description: str
    price_points: int
    stock: int
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductInDB(ProductBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

class ProductResponse(ProductInDB):
    pass
