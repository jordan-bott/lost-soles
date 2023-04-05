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
from typing import Optional

from pydantic import BaseModel
from typing import Union, List

from queries.user import (
    Error,
    UserIn,
    UserOut,
    UserOutWithPassword,
    UserAuthorizedViewOut,
    UserViewOut,
    UserQueries,
    DuplicateUserError,
)

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):

    if info.password == info.password_confirmation:
        hashed_password = authenticator.hash_password(info.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match."
        )
    try:
        user = users.create(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(account=user, **token.dict())

@router.post("/api/users/admin", response_model=UserToken | HttpError)
async def create_admin(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):

    if info.password == info.password_confirmation:
        hashed_password = authenticator.hash_password(info.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match."
        )
    try:
        admin = users.create_admin(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a admin with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(account=admin, **token.dict())

@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    users: UserQueries = Depends(),
) -> bool:
    return users.delete(user_id)

@router.put("/api/users/{user_id}", response_model=UserOut | HttpError)
def update_user(
    user_id: int,
    user: UserIn,
    users: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    if account_data["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update other users."
        )
    if user.password == user.password_confirmation:
        hashed_password = authenticator.hash_password(user.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match."
        )
    try:
        updated_user = users.update(user_id, user, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    return updated_user

@router.get("/api/users/{user_id}", response_model= UserAuthorizedViewOut | UserViewOut | HttpError)
def get_one_user(
    user_id: int,
    response: Response,
    users: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserAuthorizedViewOut | UserViewOut:
    if account_data["id"] == user_id:
        user = users.get_one_authorized(user_id)
        return user
    elif account_data["id"] != user_id:
        user = users.get_one(user_id)
        return user
    else:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail= "User does not exist",
        )


@router.get("/api/users", response_model=Union[List[UserOut], Error])
def get_users_by_query(
    users: UserQueries=Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if account_data["type"] == "admin":
        return users.get_all_users()
    else:
        return {"Error": "Only admins can view users"}
