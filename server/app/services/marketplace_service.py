from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.marketplace import EwasteListingCreate, EwasteListingInDB, ProductCreate, ProductInDB
from bson import ObjectId

class MarketplaceService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.listings = self.db.get_collection("ewaste_listings")
        self.products = self.db.get_collection("products")
        self.users = self.db.get_collection("users")

    async def create_listing(self, listing_in: EwasteListingCreate, user_id: ObjectId) -> dict:
        # Simple point calculation: 10 points per kg
        points = int(listing_in.weight_kg * 10)
        
        db_listing = EwasteListingInDB(
            **listing_in.model_dump(),
            user_id=user_id,
            points_rewarded=points,
            status="pending"
        )
        
        result = await self.listings.insert_one(db_listing.model_dump(by_alias=True, exclude={"id"}))
        listing_dict = db_listing.model_dump(by_alias=True)
        listing_dict["_id"] = result.inserted_id
        return listing_dict

    async def get_my_listings(self, user_id: ObjectId) -> list[dict]:
        cursor = self.listings.find({"user_id": user_id})
        return await cursor.to_list(length=100)

    async def get_all_products(self) -> list[dict]:
        cursor = self.products.find({})
        products = await cursor.to_list(length=100)
        return products

    async def create_product(self, product_in: ProductCreate) -> dict:
        db_product = ProductInDB(**product_in.model_dump())
        result = await self.products.insert_one(db_product.model_dump(by_alias=True, exclude={"id"}))
        product_dict = db_product.model_dump(by_alias=True)
        product_dict["_id"] = result.inserted_id
        return product_dict

    async def purchase_product(self, product_id: ObjectId, user_id: ObjectId) -> bool:
        product = await self.products.find_one({"_id": product_id})
        user = await self.users.find_one({"_id": user_id})

        if not product or not user:
            return False

        if product["stock"] <= 0:
            raise ValueError("Product out of stock")

        price = product["price_points"]
        current_points = user.get("reward_points", 0)

        if current_points < price:
            raise ValueError("Insufficient reward points balance")

        # Update User Balance and Product Stock
        await self.users.update_one(
            {"_id": user_id},
            {"$inc": {"reward_points": -price}}
        )
        await self.products.update_one(
            {"_id": product_id},
            {"$inc": {"stock": -1}}
        )
        return True
