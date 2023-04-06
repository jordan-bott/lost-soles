from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)


from queries.sock import SockIn, SockOut, SockQueries, Error
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

@router.delete("/api/socks/{sock_id}", response_model=bool | dict | HttpError | Error)
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
        return {"Error" : "Unable to delete other user's socks"}


@router.put("/api/socks/{id}", response_model=SockOut | HttpError | Error | dict)
async def update_sock(
    id: int,
    user_id: int,
    response: Response,
    info: SockIn,
    socks: SockQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> SockOut:
    try:
        if account_data['id']==user_id:
            return socks.update(id, info, user_id)
        else:
            response.status_code=400
            return  {"Error": "sock update id does not match"}
    except ValidationError as e:
        print("Error", e)
        raise HTTPException(status_code=400, detail=str(e))
