from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.security import verify_access_token
from app.db.database import db_instance
from app.services.user_service import UserService
from app.services.marketplace_service import MarketplaceService
from app.services.pickup_service import PickupService
from motor.motor_asyncio import AsyncIOMotorDatabase

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_db() -> AsyncIOMotorDatabase:
    # Ensures that the database has been connected. `db_instance.db` is set on startup.
    return db_instance.db

async def get_user_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> UserService:
    return UserService(db)

async def get_marketplace_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> MarketplaceService:
    return MarketplaceService(db)

async def get_pickup_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> PickupService:
    return PickupService(db)

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    user_service: UserService = Depends(get_user_service)
) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    print(f"--- get_current_user DEBUG ---")
    print(f"Token to verify: {token[:20]}... (length: {len(token) if token else 0})")
    
    payload = verify_access_token(token)
    print(f"Payload from verify: {payload}")
    
    if payload is None:
        print("Error: Payload is None (Verify Failed)")
        raise credentials_exception
        
    email: str = payload.get("sub")
    print(f"Email extracted: {email}")
    if email is None:
        print("Error: Email sub is missing from payload")
        raise credentials_exception
        
    user = await user_service.get_user_by_email(email)
    print(f"User in DB found: {user is not None}")
    if user is None:
        print("Error: User lookups failed in Database")
        raise credentials_exception
        
    print("--- User Auth SUCCESS ---")
    return user
