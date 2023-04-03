from pydantic import BaseModel
from queries.pool import pool

class DuplicateUserError(ValueError):
    pass

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
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            first_name,
                            last_name,
                            username,
                            hashed_password,
                            email,
                            address,
                            sockstar_points,
                            total_pairings,
                            profile_pic,
                            verified,
                            type
                        FROM users
                        WHERE username = %s
                        """,
                        [username]
                    )
                    user = result.fetchone()
                    return UserOutWithPassword(
                        id=user[0],
                        first_name=user[1],
                        last_name=user[2],
                        username=user[3],
                        hashed_password=user[4],
                        email=user[5],
                        address=user[6],
                        sockstar_points=user[7],
                        total_pairings=user[8],
                        profile_pic=user[9],
                        verified=user[10],
                        type=user[11]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (
                            first_name,
                            last_name,
                            username,
                            hashed_password,
                            email,
                            address,
                            sockstar_points,
                            total_pairings,
                            profile_pic,
                            verified,
                            type
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.first_name,
                        info.last_name,
                        info.username,
                        hashed_password,
                        info.email,
                        info.address,
                        0,
                        0,
                        info.profile_pic,
                        False,
                        "user"
                    ]
                )
                id = result.fetchone()[0]
                old_data = info.dict()
                old_data["sockstar_points"] = 0
                old_data["total_pairings"] = 0
                old_data["verified"] = False
                old_data["type"] = "user"
                old_data["hashed_password"] = hashed_password
                return UserOutWithPassword(id=id, **old_data)

    def delete(self, user_id: int) -> bool:
        try:

            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
