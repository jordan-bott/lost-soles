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
        # Use your repo to get the account based on the
        # username (which could be an email)
        return user.get(username)

    def get_account_getter(
        self,
        user: UserQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return user

    def get_hashed_password(self, user: UserOutWithPassword):
        # Return the encrypted password value from your
        # account object
        print(user)
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
