from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from typing import Union, List

from queries.match import MatchOut, MatchQueries, Error
from queries.sock import SockQueries
from authenticator import authenticator

from pydantic import BaseModel

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.post("/api/matches", response_model=MatchOut | HttpError | Error)
async def create_match(
    receive_sock: int,
    gift_sock: int,
    approving_id: int,
    matches: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    requesting_id = account_data["id"]
    return matches.create(approving_id, requesting_id, receive_sock, gift_sock)


@router.delete("/api/matches/{match_id}", response_model=bool | dict | Error)
def delete_match(
    match_id: int,
    response: Response,
    matches: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
        try:
            return matches.delete(match_id)
        except:
            response.status_code = 400
            return {"Error" : "Unable to delete match"}
