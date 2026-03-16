from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_user_service, get_current_user
from app.services.user_service import UserService
from app.models.user import UserCreate, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def create_user(
    *,
    db_service: UserService = Depends(get_user_service),
    user_in: UserCreate
):
    """
    Create new user.
    """
    user = await db_service.get_user_by_email(email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = await db_service.create_user(user_in)
    return user

@router.get("/me", response_model=UserResponse)
async def read_user_me(
    current_user: dict = Depends(get_current_user)
):
    """
    Get current user.
    """
    return current_user

@router.get("/", response_model=list[UserResponse])
async def list_users(
    db_service: UserService = Depends(get_user_service),
    current_user: dict = Depends(get_current_user)
):
    """
    Get all users. (Admin Only)
    """
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have enough privileges"
        )
    users = await db_service.get_all_users()
    return users

@router.post("/upgrade-role")
async def upgrade_user_role(
    current_user: dict = Depends(get_current_user),
    db_service: UserService = Depends(get_user_service)
):
    """
    Upgrade current user state to pickuppatner role.
    """
    success = await db_service.update_user_role(str(current_user["_id"]), "pickuppatner")
    if not success:
         raise HTTPException(status_code=400, detail="Failed to upgrade role")
    return {"detail": "Role upgraded successfully to pickuppatner"}
