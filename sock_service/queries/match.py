from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class SockIn(BaseModel):
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


class MatchOut(BaseModel):
    id: int
    requesting_user: int
    approving_user: int
    gift_sock: int
    receive_sock: int
    match_status: bool
    created_on: str


class UserMatchOut(BaseModel):
    id: int
    requesting_user: int
    approving_user: int
    gift_sock: SockIn
    receive_sock: SockIn
    match_status: bool
    created_on: str


class MatchQueries():

    def create(self,
               approving_id: int,
               requesting_id: int,
               receive_sock: int,
               gift_sock: int,) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO matches
                    (
                        requesting_user,
                        approving_user,
                        gift_sock,
                        receive_sock,
                        match_status
                    )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        requesting_id,
                        approving_id,
                        gift_sock,
                        receive_sock,
                        False
                    ]
                )
                m = result.fetchone()
                return MatchOut(
                    id=m[0],
                    requesting_user=m[1],
                    approving_user=m[2],
                    gift_sock=m[3],
                    receive_sock=m[4],
                    match_status=m[5],
                    created_on=str(m[6])
                )

    def get_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT matches.*,
                        socks.*
                        FROM matches
                        LEFT OUTER JOIN socks
                        ON matches.gift_sock = socks.id
                        """
                    )
                    matches = []
                    user_dict = {}
                    data = db.fetchall()
                    for m in data:
                        user_dict["requesting_user"] = m[1]
                        user_dict["approving_user"] = m[2]
                        user_dict["gift_sock"] = {
                            'id': m[7],
                            'user_id': m[8],
                            'photo': m[9],
                            'color': m[10],
                            'pattern': m[11],
                            'size': m[12],
                            'type': m[13],
                            'fabric': m[14],
                            'style': m[15],
                            'brand': m[16],
                            'gift': m[17],
                            'match_status': m[18]
                        }
                        db.execute(
                            """
                            SELECT *
                            FROM socks
                            WHERE id = %s
                            """,
                            [m[4]]
                        )
                        s = db.fetchone()
                        user_dict["receive_sock"] = {
                            "id": s[0],
                            'user_id': s[1],
                            'photo': s[2],
                            'color': s[3],
                            'pattern': s[4],
                            'size': s[5],
                            'type': s[6],
                            'fabric': s[7],
                            'style': s[8],
                            'brand': s[9],
                            'gift': s[10],
                            'match_status': s[11]
                        }
                        user_dict["match_status"] = m[5]
                        user_dict["created_on"] = str(m[6])
                        if m[1] == user_id or m[2] == user_id:
                            matches.append(UserMatchOut(id=m[0], **user_dict))
                    return matches
        except Exception as e:
            print("get all matches by user error", e)
            return {"Error": "Could not get all matches for this user"}

    def delete(self, match_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM matches
                        WHERE id = %s
                        """,
                        [match_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def approve(self, match_id: int, approving_user: int) -> MatchOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE matches
                        SET match_status = %s
                        WHERE id = %s
                        AND approving_user = %s
                        RETURNING *;
                        """,
                        [True, match_id, approving_user]
                    )
                    m = db.fetchone()
                    return MatchOut(
                        id=m[0],
                        requesting_user=m[1],
                        approving_user=m[2],
                        gift_sock=m[3],
                        receive_sock=m[4],
                        match_status=m[5],
                        created_on=str(m[6])
                    )
        except Exception as e:
            print(e)
            return False

    def get_one(self, match_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                            """
                            SELECT matches.*,
                            socks.*
                            FROM matches
                            LEFT OUTER JOIN socks
                            ON matches.gift_sock = socks.id
                            WHERE matches.id = %s
                            """,
                            [match_id]
                        )
                    match = []
                    user_dict = {}
                    data = db.fetchall()
                    for m in data:
                        user_dict["requesting_user"] = m[1]
                        user_dict["approving_user"] = m[2]
                        user_dict["gift_sock"] = {
                            'id': m[7],
                            'user_id': m[8],
                            'photo': m[9],
                            'color': m[10],
                            'pattern': m[11],
                            'size': m[12],
                            'type': m[13],
                            'fabric': m[14],
                            'style': m[15],
                            'brand': m[16],
                            'gift': m[17],
                            'match_status': m[18]
                        }
                        db.execute(
                            """
                            SELECT *
                            FROM socks
                            WHERE id = %s
                            """,
                            [m[4]]
                        )
                        s = db.fetchone()
                        user_dict["receive_sock"] = {
                            "id": s[0],
                            'user_id': s[1],
                            'photo': s[2],
                            'color': s[3],
                            'pattern': s[4],
                            'size': s[5],
                            'type': s[6],
                            'fabric': s[7],
                            'style': s[8],
                            'brand': s[9],
                            'gift': s[10],
                            'match_status': s[11]
                        }
                        user_dict["match_status"] = m[5]
                        user_dict["created_on"] = str(m[6])
                        if m[1] == user_id or m[2] == user_id:
                            match.append(UserMatchOut
                                         (id=m[0], **user_dict)
                                         )
                    return match
        except Exception as e:
            print("get matches error", e)
            return {"Error": "Could not get this match"}
