import asyncio
import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from starlette.responses import HTMLResponse

from orms.db_models import create_tables
from routers.user_crud import router as user_router

app = FastAPI()
app.include_router(user_router)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


async def main():
    await create_tables()
    uvicorn.run("main:app", reload=True)


if __name__ == "__main__":
    asyncio.run(main())
