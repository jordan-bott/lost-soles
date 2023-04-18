from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from typing import Union, List

from queries.match import MatchOut, MatchQueries, Error, UserMatchOut
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

@router.get("/api/matches/users/{user_id}", response_model=List[UserMatchOut] | dict | Error)
def get_matches_by_user(
    user_id: int,
    response: Response,
    matches: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    user_id = account_data["id"]
    match_list = matches.get_by_user(user_id)
    print(match_list)
    if len(match_list) == 0:
        response.status_code = 404
        return {"Error": "No matches yet!"}
    return match_list

@router.delete("/api/matches/{match_id}", response_model=bool | dict | Error)
def delete_match(
    match_id: int,
    response: Response,
    requesting_user:int,
    approving_user:int,
    matches: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
        if requesting_user == account_data["id"] or approving_user == account_data["id"]:
            return matches.delete(match_id, requesting_user, approving_user)
        else:
            response.status_code = 400
            return {"Error" : "Unable to delete match"}


@router.put("/api/matches/{match_id}", response_model=MatchOut | dict | Error)
def approve_match(
    match_id: int,
    response: Response,
    matches: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    approving_user = account_data["id"]
    return matches.approve(match_id, approving_user)

@router.get("/api/matches/{id}", response_model=List[UserMatchOut] | dict |  Error)
def get_one_match(
    id: int,
    user_id: int,
    response: Response,
    match: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    match = match.get_one(id, user_id)
    user_id = account_data["id"]
    if len(match) == 0:
        response.status_code = 404
        return {"Error": "Match not found"}
    return match
