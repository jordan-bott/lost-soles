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



class SockQueries():

    def create(self, info: SockIn, user_id: int) -> SockOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
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
                    RETURNING id;
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
                id = result.fetchone()[0]
                old_data = info.dict()
                old_data["user_id"] = user_id
                old_data["match_status"] = "available"
                return SockOut(id=id, **old_data)

    def delete(self, sock_id: int, user_id: int) -> bool:
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
                        id= s[0],
                        user_id= s[1],
                        photo= s[2],
                        condition= s[3],
                        color= s[4],
                        pattern= s[5],
                        size= s[6],
                        type= s[7],
                        fabric= s[8],
                        style= s[9],
                        brand= s[10],
                        gift= s[11],
                        match_status=s[12]
                        )
                        print(sock)
                        socks.append(sock)
                    return socks
        except Exception as e:
            print("get all socks by user error", e)
            return {"Error": "could not get all socks for this user"}


    def update(self, id: int, info: SockIn, user_id: int) -> SockOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE socks
                        SET user_id = %s,
                            photo = %s,
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
                        match_status=update_fetch[12]
                    )
        except Exception as e:
            print("Update sock error: ", e)
            return {"Message": "Update sock error"}
