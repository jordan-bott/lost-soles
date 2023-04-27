from fastapi import (
    Depends,
    HTTPException,
    Response,
    APIRouter,
)

from typing import List

from queries.sock import SockIn, SockOut, SockQueries, Error, SockWithUserOut
from authenticator import authenticator

from pydantic import BaseModel, ValidationError


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


@router.delete("/api/users/{user_id}/socks/{sock_id}",
               response_model=bool | dict | Error)
def delete_sock(
    sock_id: int,
    response: Response,
    user_id: int,
    socks: SockQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data["id"] == user_id:
        return socks.delete(sock_id, user_id)
    elif account_data["id"] != user_id:
        response.status_code = 400
        return {"Error": "Unable to delete other user's socks"}


@router.get("/api/socks", response_model=List[SockWithUserOut] | Error)
def get_feed(
    response: Response,
    socks: SockQueries = Depends()
):
    sock_feed = socks.get_feed()
    if len(sock_feed) == 0:
        response.status_code = 400
        return {"Error": "No unmatched socks in the feed!"}
    return sock_feed


@router.get("/api/socks/users/{user_id}",
            response_model=List[SockOut] | dict | Error)
def get_socks_by_user(
    user_id: int,
    response: Response,
    socks: SockQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if account_data["id"] == user_id:
        sock_list = socks.get_by_user(user_id)
    elif account_data["id"] != user_id:
        response.status_code = 400
        return {"Error": "Unable to view other user's socks"}
    if len(sock_list) == 0:
        response.status_code = 404
        return {"Error": "No socks yet!"}
    return sock_list


@router.put("/api/users/{user_id}/socks/{id}",
            response_model=SockOut | HttpError | Error | dict)
async def update_sock(
    id: int,
    user_id: int,
    response: Response,
    info: SockIn,
    socks: SockQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> SockOut:
    try:
        if account_data['id'] == user_id:
            return socks.update(id, info)
        else:
            response.status_code = 400
            return {"Error": "sock update id does not match"}
    except ValidationError as e:
        print("Error", e)
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/socks/{id}", response_model=SockWithUserOut | Error)
def get_one_sock(
    id: int,
    response: Response,
    sock: SockQueries = Depends()
):
    sock = sock.get_one_sock(id)
    if sock is None:
        response.status_code = 404
        return {"Error": "Sock not found"}
    return sock
