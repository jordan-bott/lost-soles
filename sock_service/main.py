from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import user, sock, match, verification
import os

app = FastAPI()
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(user.router, tags=["Users"])
app.include_router(sock.router, tags=["Socks"])
app.include_router(match.router, tags=["Matches"])
app.include_router(verification.router, tags=["Verifications"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
