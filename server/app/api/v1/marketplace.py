from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_marketplace_service, get_current_user
from app.services.marketplace_service import MarketplaceService
from app.models.marketplace import EwasteListingCreate, EwasteListingResponse, ProductResponse, ProductCreate
from bson import ObjectId

router = APIRouter()

# --- E-waste Listings ---

@router.post("/ewaste/list", response_model=EwasteListingResponse)
async def create_ewaste_listing(
    *,
    db_service: MarketplaceService = Depends(get_marketplace_service),
    current_user: dict = Depends(get_current_user),
    listing_in: EwasteListingCreate
):
    """
    Submit E-waste for recycling to earn points.
    """
    user_id = current_user["_id"]
    listing = await db_service.create_listing(listing_in, user_id)
    return listing

@router.get("/ewaste/my-listings", response_model=list[EwasteListingResponse])
async def list_my_ewaste(
    db_service: MarketplaceService = Depends(get_marketplace_service),
    current_user: dict = Depends(get_current_user)
):
    """
    Get all e-waste listings submitted by current user.
    """
    user_id = current_user["_id"]
    listings = await db_service.get_my_listings(user_id)
    return listings

# --- Products Store ---

@router.get("/products", response_model=list[ProductResponse])
async def list_products(
    db_service: MarketplaceService = Depends(get_marketplace_service)
):
    """
    List all available buyable products in the store.
    """
    return await db_service.get_all_products()

@router.post("/products", response_model=ProductResponse)
async def create_product(
    *,
    db_service: MarketplaceService = Depends(get_marketplace_service),
    current_user: dict = Depends(get_current_user),
    product_in: ProductCreate
):
    """
    Create a product (Admin Only).
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return await db_service.create_product(product_in)

@router.post("/products/{product_id}/purchase")
async def purchase_product(
    product_id: str,
    db_service: MarketplaceService = Depends(get_marketplace_service),
    current_user: dict = Depends(get_current_user)
):
    """
    Purchase a product using reward points.
    """
    try:
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid Product ID")
        
        user_id = current_user["_id"]
        success = await db_service.purchase_product(ObjectId(product_id), user_id)
        
        if not success:
            raise HTTPException(status_code=400, detail="Purchase failed")
            
        return {"detail": "Purchase successful"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
