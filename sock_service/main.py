from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from fastapi import APIRouter
from routers import user, sock, match, verification
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(user.router)
app.include_router(sock.router)
app.include_router(match.router)
app.include_router(verification.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
