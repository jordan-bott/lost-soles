from pydantic import BaseModel


class UserIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    password_confirmation: str
    email: str
    address: str
    profile_pic: str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    address: str
    profile_pic: str
    sockstar_points: int
    total_pairings: int
    verified: bool
    type: str

class UserOutWithPassword(UserOut):
    hashed_password: str


class UserQueries():

    def get(self, username: str) -> UserOutWithPassword:
        pass

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        pass
