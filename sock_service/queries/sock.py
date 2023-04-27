from pydantic import BaseModel
from queries.pool import pool
from typing import List


class Error(BaseModel):
    message: str


class SockIn(BaseModel):
    photo: str
    condition: int
    color: str
    pattern: str
    size: str
    type: str
    fabric: str
    style: str
    brand: str
    gift: bool


class SockOut(BaseModel):
    id: int
    user_id: int
    photo: str
    condition: int
    color: str
    pattern: str
    size: str
    type: str
    fabric: str
    style: str
    brand: str
    gift: bool
    match_status: str
    created_on: str


class SockWithUserOut(SockOut):
    username: str
    email: str
    profile_pic: str
    sockstar_points: int
    total_pairings: int
    verified: bool


class SockQueries():

    def get_feed(self) -> List[SockWithUserOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT socks.*,
                        users.username,
                        users.email,
                        users.profile_pic,
                        users.sockstar_points,
                        users.total_pairings,
                        users.verified
                        FROM socks
                        LEFT OUTER JOIN users
                        ON socks.user_id = users.id
                        ORDER BY created_on DESC;
                        """,
                    )
                    posts = []
                    for post in db:
                        sock_post = SockWithUserOut(
                            id=post[0],
                            user_id=post[1],
                            photo=post[2],
                            condition=post[3],
                            color=post[4],
                            pattern=post[5],
                            size=post[6],
                            type=post[7],
                            fabric=post[8],
                            style=post[9],
                            brand=post[10],
                            gift=post[11],
                            match_status=post[12],
                            created_on=str(post[13]),
                            username=post[14],
                            email=post[15],
                            profile_pic=post[16],
                            sockstar_points=post[17],
                            total_pairings=post[18],
                            verified=post[19]
                        )
                        if post[12] == "available" or post[12] == "pending":
                            posts.append(sock_post)
                    return posts
        except Exception as e:
            return {"error": e}

    def create(self, info: SockIn, user_id: int) -> SockOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO socks
                        (
                            user_id,
                            photo,
                            condition,
                            color,
                            pattern,
                            size,
                            type,
                            fabric,
                            style,
                            brand,
                            gift,
                            match_status
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        user_id,
                        info.photo,
                        info.condition,
                        info.color,
                        info.pattern,
                        info.size,
                        info.type,
                        info.fabric,
                        info.style,
                        info.brand,
                        info.gift,
                        "available"
                    ]
                )
                sock = db.fetchone()
                return SockOut(
                            id=sock[0],
                            user_id=sock[1],
                            photo=sock[2],
                            condition=sock[3],
                            color=sock[4],
                            pattern=sock[5],
                            size=sock[6],
                            type=sock[7],
                            fabric=sock[8],
                            style=sock[9],
                            brand=sock[10],
                            gift=sock[11],
                            match_status=sock[12],
                            created_on=str(sock[13]),
                        )

    def delete(self, sock_id: int, user_id: int,) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM socks
                        WHERE id = %s
                        """,
                        [sock_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    socks = db.execute(
                        """
                        SELECT *
                        FROM socks
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    socks = []
                    for s in db:
                        sock = SockOut(
                            id=s[0],
                            user_id=s[1],
                            photo=s[2],
                            condition=s[3],
                            color=s[4],
                            pattern=s[5],
                            size=s[6],
                            type=s[7],
                            fabric=s[8],
                            style=s[9],
                            brand=s[10],
                            gift=s[11],
                            match_status=s[12],
                            created_on=str(s[13])
                        )
                        socks.append(sock)
                    print(socks)
                    return socks
        except Exception as e:
            print("get all socks by user error", e)
            return {"Error": "Could not get all socks for this user"}

    def get_one_sock(self, sock_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT socks.*,
                        users.username,
                        users.email,
                        users.profile_pic,
                        users.sockstar_points,
                        users.total_pairings,
                        users.verified
                        FROM socks
                        LEFT OUTER JOIN users
                        ON socks.user_id = users.id
                        WHERE socks.id = %s;
                        """,
                        [sock_id]
                    )
                    sock = db.fetchone()
                    return SockWithUserOut(
                        id=sock[0],
                        user_id=sock[1],
                        photo=sock[2],
                        condition=sock[3],
                        color=sock[4],
                        pattern=sock[5],
                        size=sock[6],
                        type=sock[7],
                        fabric=sock[8],
                        style=sock[9],
                        brand=sock[10],
                        gift=sock[11],
                        match_status=sock[12],
                        created_on=str(sock[13]),
                        username=sock[14],
                        email=sock[15],
                        profile_pic=sock[16],
                        sockstar_points=sock[17],
                        total_pairings=sock[18],
                        verified=sock[19]
                    )
        except Exception as e:
            print("get one sock error", e)
            return {"Error": "Could not get sock"}

    def update(self, id: int, info: SockIn) -> SockOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE socks
                        SET photo = %s,
                            condition = %s,
                            color = %s,
                            pattern = %s,
                            size = %s,
                            type = %s,
                            fabric = %s,
                            style = %s,
                            brand = %s,
                            gift = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [
                            info.photo,
                            info.condition,
                            info.color,
                            info.pattern,
                            info.size,
                            info.type,
                            info.fabric,
                            info.style,
                            info.brand,
                            info.gift,
                            id
                        ]
                    )
                    update_fetch = db.fetchone()
                    return SockOut(
                        id=update_fetch[0],
                        user_id=update_fetch[1],
                        photo=update_fetch[2],
                        condition=update_fetch[3],
                        color=update_fetch[4],
                        pattern=update_fetch[5],
                        size=update_fetch[6],
                        type=update_fetch[7],
                        fabric=update_fetch[8],
                        style=update_fetch[9],
                        brand=update_fetch[10],
                        gift=update_fetch[11],
                        match_status=update_fetch[12],
                        created_on=str(update_fetch[13])
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}
