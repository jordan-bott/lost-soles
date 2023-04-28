# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user import UserOut, UserOutWithPassword, UserQueries


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        user: UserQueries,
    ):
        return user.get(username)

    def get_account_getter(
        self,
        user: UserQueries = Depends(),
    ):
        return user

    def get_hashed_password(self, user: UserOutWithPassword):

        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):

        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
