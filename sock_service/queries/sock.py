from pydantic import BaseModel
from queries.pool import pool
from typing import List


class Error(BaseModel):
    message: str


class SockIn(BaseModel):
    photo: str
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
                            color=post[3],
                            pattern=post[4],
                            size=post[5],
                            type=post[6],
                            fabric=post[7],
                            style=post[8],
                            brand=post[9],
                            gift=post[10],
                            match_status=post[11],
                            created_on=str(post[12]),
                            username=post[13],
                            email=post[14],
                            profile_pic=post[15],
                            sockstar_points=post[16],
                            total_pairings=post[17],
                            verified=post[18]
                        )
                        if post[11] == "available" or post[11] == "pending":
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
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        user_id,
                        info.photo,
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
                            color=sock[3],
                            pattern=sock[4],
                            size=sock[5],
                            type=sock[6],
                            fabric=sock[7],
                            style=sock[8],
                            brand=sock[9],
                            gift=sock[10],
                            match_status=sock[11],
                            created_on=str(sock[12]),
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
                            color=s[3],
                            pattern=s[4],
                            size=s[5],
                            type=s[6],
                            fabric=s[7],
                            style=s[8],
                            brand=s[9],
                            gift=s[10],
                            match_status=s[11],
                            created_on=str(s[12])
                        )
                        socks.append(sock)
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
                        color=sock[3],
                        pattern=sock[4],
                        size=sock[5],
                        type=sock[6],
                        fabric=sock[7],
                        style=sock[8],
                        brand=sock[9],
                        gift=sock[10],
                        match_status=sock[11],
                        created_on=str(sock[12]),
                        username=sock[13],
                        email=sock[14],
                        profile_pic=sock[15],
                        sockstar_points=sock[16],
                        total_pairings=sock[17],
                        verified=sock[18]
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
                        color=update_fetch[3],
                        pattern=update_fetch[4],
                        size=update_fetch[5],
                        type=update_fetch[6],
                        fabric=update_fetch[7],
                        style=update_fetch[8],
                        brand=update_fetch[9],
                        gift=update_fetch[10],
                        match_status=update_fetch[11],
                        created_on=str(update_fetch[12])
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}

    def pending_match(self, id: int) -> SockOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE socks
                        SET match_status = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        ["pending", id]
                    )
                    sock = db.fetchone()
                    return SockOut(
                        id=sock[0],
                        user_id=sock[1],
                        photo=sock[2],
                        color=sock[3],
                        pattern=sock[4],
                        size=sock[5],
                        type=sock[6],
                        fabric=sock[7],
                        style=sock[8],
                        brand=sock[9],
                        gift=sock[10],
                        match_status=sock[11],
                        created_on=str(sock[12])
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}

    def matched(self, id: int) -> SockOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE socks
                        SET match_status = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        ["matched", id]
                    )
                    sock = db.fetchone()
                    return SockOut(
                        id=sock[0],
                        user_id=sock[1],
                        photo=sock[2],
                        color=sock[3],
                        pattern=sock[4],
                        size=sock[5],
                        type=sock[6],
                        fabric=sock[7],
                        style=sock[8],
                        brand=sock[9],
                        gift=sock[10],
                        match_status=sock[11],
                        created_on=str(sock[12])
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}

    def get_unmatched_by_user(self, user_id: int):
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
                            color=s[3],
                            pattern=s[4],
                            size=s[5],
                            type=s[6],
                            fabric=s[7],
                            style=s[8],
                            brand=s[9],
                            gift=s[10],
                            match_status=s[11],
                            created_on=str(s[12])
                        )
                        if s[11] != "matched":
                            socks.append(sock)
                    print(socks)
                    return socks
        except Exception as e:
            print("get all socks by user error", e)
            return {"Error": "Could not get all socks for this user"}

    def rejected(self, id: int) -> SockOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE socks
                        SET match_status = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        ["available", id]
                    )
                    sock = db.fetchone()
                    return SockOut(
                        id=sock[0],
                        user_id=sock[1],
                        photo=sock[2],
                        color=sock[3],
                        pattern=sock[4],
                        size=sock[5],
                        type=sock[6],
                        fabric=sock[7],
                        style=sock[8],
                        brand=sock[9],
                        gift=sock[10],
                        match_status=sock[11],
                        created_on=str(sock[12])
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}
