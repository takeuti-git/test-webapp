from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from src import models
from src.db import get_db

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 本番環境では、allow_originはフロントのドメインのみにする
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index(db_session: Session = Depends(get_db)):
    stmt = select(models.User)
    users = db_session.scalars(stmt).all()
    return users

@app.get("/health")
async def health_check():
    return {"status": "ok"}

