from sqlalchemy import Integer, String
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

engine = create_async_engine(url="postgresql+asyncpg://postgres:root@localhost:5432/localtest")
session_maker = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True)



async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

