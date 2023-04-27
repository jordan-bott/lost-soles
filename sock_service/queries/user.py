from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class DuplicateUserError(ValueError):
    pass


class Error(BaseModel):
    message: str


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
    created_on: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserAuthorizedViewOut(BaseModel):
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
    created_on: str


class UserViewOut(BaseModel):
    id: int
    username: str
    email: str
    profile_pic: str
    sockstar_points: int
    total_pairings: int
    created_on: str


class UserQueries():
    def get_one_authorized(self,
                           user_id: int) -> Optional[UserAuthorizedViewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            first_name,
                            last_name,
                            username,
                            email,
                            address,
                            profile_pic,
                            sockstar_points,
                            total_pairings,
                            verified,
                            created_on
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    user = result.fetchone()
                    return UserAuthorizedViewOut(
                        id=user[0],
                        first_name=user[1],
                        last_name=user[2],
                        username=user[3],
                        email=user[4],
                        address=user[5],
                        profile_pic=user[6],
                        sockstar_points=user[7],
                        total_pairings=user[8],
                        verified=user[9],
                        created_on=str(user[10])
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_one(self, user_id: int) -> Optional[UserViewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            username,
                            email,
                            sockstar_points,
                            total_pairings,
                            profile_pic,
                            created_on
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    user = result.fetchone()
                    return UserViewOut(
                        id=user[0],
                        username=user[1],
                        email=user[2],
                        sockstar_points=user[3],
                        total_pairings=user[4],
                        profile_pic=user[5],
                        created_on=str(user[6])
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

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
                            type,
                            created_on
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
                        type=user[11],
                        created_on=str(user[12])
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def create(self,
               info: UserIn,
               hashed_password: str) -> UserOutWithPassword | Error:
        try:
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
                        RETURNING *;
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
                        type=user[11],
                        created_on=str(user[12])
                    )
        except Exception as e:
            return {"Error": e}

    def create_admin(self,
                     info: UserIn,
                     hashed_password: str) -> UserOutWithPassword:
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
                    RETURNING *;
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
                        "admin"
                    ]
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
                    type=user[11],
                    created_on=str(user[12])
                )

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

    def update(self,
               user_id: int,
               user: UserIn,
               hashed_password: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            username = %s,
                            hashed_password = %s,
                            email = %s,
                            address = %s,
                            profile_pic = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            hashed_password,
                            user.email,
                            user.address,
                            user.profile_pic,
                            user_id
                        ]
                    )
                    update_fetch = db.fetchone()

                    return UserOutWithPassword(
                        id=update_fetch[0],
                        first_name=update_fetch[1],
                        last_name=update_fetch[2],
                        username=update_fetch[3],
                        hashed_password=update_fetch[4],
                        email=update_fetch[5],
                        address=update_fetch[6],
                        sockstar_points=update_fetch[7],
                        total_pairings=update_fetch[8],
                        profile_pic=update_fetch[9],
                        verified=update_fetch[10],
                        type=update_fetch[11],
                        created_on=str(update_fetch[12])
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that user"}

    def get_all_users(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    users = db.execute(
                        """
                        SELECT *
                        FROM users
                        """,
                    )
                    users = []
                    for u in db:
                        user = UserOut(
                            id=u[0],
                            first_name=u[1],
                            last_name=u[2],
                            username=u[3],
                            email=u[5],
                            address=u[6],
                            sockstar_points=u[7],
                            total_pairings=u[8],
                            profile_pic=u[9],
                            verified=u[10],
                            type=u[11],
                            created_on=str(u[12])
                        )
                        users.append(user)
                    return users
        except Exception as e:
            print("get all users error", e)
            return {"Error": "could not get all users"}

    def verify(self, id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    vrfy = db.execute(
                        """
                        UPDATE users
                        SET verified = True
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [id]
                    )
                    vrfy = vrfy.fetchone()
                    user_update = UserOut(
                        id=vrfy[0],
                        first_name=vrfy[1],
                        last_name=vrfy[2],
                        username=vrfy[3],
                        email=vrfy[5],
                        address=vrfy[6],
                        sockstar_points=vrfy[7],
                        total_pairings=vrfy[8],
                        profile_pic=vrfy[9],
                        verified=vrfy[10],
                        type=vrfy[11],
                        created_on=str(vrfy[12])
                    )
                    return user_update
        except Exception as e:
            return {"Error": e}

    def unverify(self, id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    vrfy = db.execute(
                        """
                        UPDATE users
                        SET verified = False
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [id]
                    )
                    vrfy = vrfy.fetchone()
                    user_update = UserOut(
                        id=vrfy[0],
                        first_name=vrfy[1],
                        last_name=vrfy[2],
                        username=vrfy[3],
                        email=vrfy[5],
                        address=vrfy[6],
                        sockstar_points=vrfy[7],
                        total_pairings=vrfy[8],
                        profile_pic=vrfy[9],
                        verified=vrfy[10],
                        type=vrfy[11],
                        created_on=str(vrfy[12])
                    )
                    return user_update
        except Exception as e:
            return {"Error": e}

    def sockstar(self, user_id: int, points: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET sockstar_points = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [points, user_id]
                    )
                    print(4)
                    ss = db.fetchone()
                    print(ss)
                    user = UserOut(
                            id=ss[0],
                            first_name=ss[1],
                            last_name=ss[2],
                            username=ss[3],
                            email=ss[5],
                            address=ss[6],
                            sockstar_points=ss[7],
                            total_pairings=ss[8],
                            profile_pic=ss[9],
                            verified=ss[10],
                            type=ss[11],
                            created_on=str(ss[12])
                        )
                    print(user)
                return user
        except Exception as e:
            return {"error": e}
