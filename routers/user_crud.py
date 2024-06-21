from fastapi import APIRouter

from orms.shemas import insert_user, get_users, get_user, get_user_by_id
from routers.models import Vuser

router = APIRouter(prefix="/users")


@router.post("/create/")
async def create_user_func(user: Vuser):
    await insert_user(user)
    return {"message": "success",
            "new_user": user}


@router.get("/user/")
async def get_user_func(user_name: str):
    result = await get_user(user_name)
    return {"message": "success",
            "users": result}


@router.get("/user/{user_id}")
async def get_user_func(user_id: int):
    result = await get_user_by_id(user_id)
    return {"message": "success",
            "users": result}


@router.get("/")
async def get_users_func():
    return {"message": "success",
            "users": await get_users()}



