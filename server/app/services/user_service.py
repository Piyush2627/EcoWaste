from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models.user import UserCreate, UserInDB
from app.core.security import get_password_hash, verify_password

class UserService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = self.db.get_collection("users")
    
    async def get_user_by_email(self, email: str) -> dict:
        user = await self.collection.find_one({"email": email})
        return user

    async def create_user(self, user_in: UserCreate) -> dict:
        existing_user = await self.get_user_by_email(user_in.email)
        if existing_user:
            return None # Or raise exception
            
        hashed_password = get_password_hash(user_in.password)
        db_user = UserInDB(
            **user_in.model_dump(exclude={"password"}),
            hashed_password=hashed_password
        )
        
        result = await self.collection.insert_one(db_user.model_dump(by_alias=True, exclude={"id"}))
        user_dict = db_user.model_dump(by_alias=True)
        user_dict["_id"] = result.inserted_id
        return user_dict
    
    async def authenticate_user(self, email: str, password: str) -> dict:
        user = await self.get_user_by_email(email)
        if not user:
            return None
        if not verify_password(password, user["hashed_password"]):
            return None
        return user

    async def get_all_users(self) -> list[dict]:
        cursor = self.collection.find({})
        users = await cursor.to_list(length=100) # Simple limit for now
        return users

    async def update_user_role(self, user_id: str, role: str) -> bool:
        from bson import ObjectId
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"role": role}}
        )
        return result.modified_count > 0
