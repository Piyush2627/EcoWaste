from fastapi import APIRouter

from app.api.v1 import users, auth, marketplace, analyzer, pickup

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
api_router.include_router(analyzer.router, prefix="/analyzer", tags=["analyzer"])
api_router.include_router(pickup.router, prefix="/pickup-request", tags=["pickup"])
