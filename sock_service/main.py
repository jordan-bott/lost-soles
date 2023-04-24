from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import user, sock, match, verification, email
import os

app = FastAPI()
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(user.router, tags=["Users"])
app.include_router(sock.router, tags=["Socks"])
app.include_router(match.router, tags=["Matches"])
app.include_router(verification.router, tags=["Verifications"])
app.include_router(email.router, tags=["Emails"])

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
