from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from typing import Union

from queries.sock import SockIn, SockOut, SockQueries, Error
from authenticator import authenticator

from pydantic import BaseModel

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.post("/api/socks", response_model=SockOut | HttpError | Error)
async def create_sock(
    info: SockIn,
    socks: SockQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    user_id = account_data["id"]
    return socks.create(info, user_id)
