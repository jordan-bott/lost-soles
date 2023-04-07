from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List

from queries.verification import (
    VerificationOut,
    VerificationIn,
    VerificationQueries
)
class HttpError(BaseModel):
    detail: str



router = APIRouter()

@router.post("/api/user_verification", response_model=VerificationOut | HttpError)
async def create_verification(
    info: VerificationIn,
    verification: VerificationQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    user_id = account_data["id"]
    return verification.create(info, user_id)
