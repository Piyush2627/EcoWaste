from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.pickup import PickupRequestCreate
from datetime import datetime
from bson import ObjectId
from typing import Optional

class PickupService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.pickup_requests

    async def update_pickup_status(self, pickup_id: str, status: str, points: Optional[int] = None) -> bool:
        pickup = await self.collection.find_one({"_id": ObjectId(pickup_id)})
        if not pickup:
            return False

        update_doc = {"status": status}
        if points is not None:
            update_doc["estimated_points"] = points

        # If transitioning to Approved, increment user's reward points
        if status.lower() == "approved" and pickup.get("status", "").lower() != "approved":
            user_id = pickup["user_id"]
            grant_points = points if points is not None else pickup.get("estimated_points", 0)
            if grant_points > 0:
                # Access users collection via self.db
                await self.db.users.update_one(
                    {"_id": ObjectId(user_id)},
                    {"$inc": {"reward_points": grant_points}}
                )

        result = await self.collection.update_one(
            {"_id": ObjectId(pickup_id)},
            {"$set": update_doc}
        )
        return result.modified_count > 0

    async def create_pickup(self, user_id: str, request: PickupRequestCreate) -> str:
        data = request.dict()
        data["user_id"] = user_id
        data["status"] = "Pending"
        data["created_at"] = datetime.utcnow()
        result = await self.collection.insert_one(data)
        return str(result.inserted_id)

    async def get_my_pickups(self, user_id: str):
        cursor = self.collection.find({"user_id": user_id})
        docs = await cursor.to_list(length=100)
        # Convert _id to id string for Pydantic
        for doc in docs:
            doc["_id"] = str(doc["_id"])
        return docs

    async def get_all_pickups(self):
        cursor = self.collection.find()
        docs = await cursor.to_list(length=100)
        for doc in docs:
            doc["_id"] = str(doc["_id"])
        return docs
