from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from app.models.pickup import PickupRequestCreate, PickupRequest
from app.services.pickup_service import PickupService
from app.api.deps import get_pickup_service, get_current_user

router = APIRouter()

@router.post("/create", response_model=str)
async def create_pickup(
    request: PickupRequestCreate,
    current_user: dict = Depends(get_current_user),
    pickup_service: PickupService = Depends(get_pickup_service)
):
    """
    Creates a new e-waste pickup request based on AI analysis.
    """
    try:
        inserted_id = await pickup_service.create_pickup(str(current_user["_id"]), request)
        return inserted_id
    except Exception as e:
        import traceback
        try:
            with open("logs_pickup_500.txt", "a") as f:
                f.write("\n--- EXCEPTION IN /pickup-request/create ---\n")
                traceback.print_exc(file=f)
                f.write("-----------------------------\n")
        except:
             pass
        raise HTTPException(status_code=500, detail=f"Failed to create pickup: {str(e)}")

@router.get("/my-requests", response_model=List[dict])
async def get_my_pickups(
    current_user: dict = Depends(get_current_user),
    pickup_service: PickupService = Depends(get_pickup_service)
):
    """
    Retrieves all pickup requests for the authenticated user.
    """
    try:
        return await pickup_service.get_my_pickups(str(current_user["_id"]))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch pickups: {str(e)}")

@router.get("/all", response_model=List[dict])
async def get_all_pickups(
    current_user: dict = Depends(get_current_user),
    pickup_service: PickupService = Depends(get_pickup_service)
):
    """
    Retrieves all pickup requests (Admin/Partner view).
    """
    # Verify Admin or PickupPartner role
    if current_user.get("role") not in ["admin", "pickuppatner"]:
        raise HTTPException(status_code=403, detail="Not authorized to view all requests")
        
    try:
        return await pickup_service.get_all_pickups()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch all pickups: {str(e)}")

@router.post("/{pickup_id}/status")
async def update_pickup_status(
    pickup_id: str,
    status: str,
    points: Optional[int] = None,
    current_user: dict = Depends(get_current_user),
    pickup_service: PickupService = Depends(get_pickup_service)
):
    """
    Updates the status of a pickup request (Admin/Partner view).
    """
    if current_user.get("role") not in ["admin", "pickuppatner"]:
        raise HTTPException(status_code=403, detail="Not authorized to update status")
        
    success = await pickup_service.update_pickup_status(pickup_id, status, points)
    if not success:
         raise HTTPException(status_code=404, detail="Pickup request not found or failed to update")
    return {"detail": "Status updated successfully"}
