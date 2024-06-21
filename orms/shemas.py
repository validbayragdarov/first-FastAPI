from sqlalchemy import select

from orms.db_models import session_maker, User
from routers.models import Vuser


async def insert_user(user: Vuser):
    async with session_maker() as session:
        new_user = User(**user.model_dump())
        session.add(new_user)
        await session.flush()
        await session.commit()


async def get_users():
    async with session_maker() as session:
        query = select(User)
        result = await session.execute(query)
        return result.scalars().all()


async def get_user(name: str):
    async with session_maker() as session:
        query = select(User).where(User.name == name)
        result = await session.execute(query)
        return result.scalars().all()


async def get_user_by_id(user_id: int):
    async with session_maker() as session:
        query = select(User).where(User.id == user_id)
        result = await session.execute(query)
        return result.scalars().all()