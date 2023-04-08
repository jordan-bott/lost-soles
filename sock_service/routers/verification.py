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
    VerificationQueries,
    Error
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


@router.get("/api/all_verifications", response_model=Union[List[VerificationOut], dict])
async def get_all_verifications(
    response: Response,
    verification: VerificationQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if account_data["type"]=="admin":
        return verification.get_all_verifications()
    elif account_data["type"]=="user":
        response.status_code=400
        return  {"Error": "must be admin"}
