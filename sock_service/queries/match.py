from pydantic import BaseModel
from queries.pool import pool
from typing import List


class Error(BaseModel):
    message: str

class MatchOut(BaseModel):
    id: int
    gift_sock: int
    requesting_user: int
    approving_user: int
    receive_sock: int
    match_status: bool


class MatchQueries():

    def create(self, approving_id: int, requesting_id: int, receive_sock: int, gift_sock: int,) -> MatchOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO matches
                    (
                        gift_sock,
                        requesting_user,
                        approving_user,
                        receive_sock,
                        match_status
                    )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        gift_sock,
                        requesting_id,
                        approving_id,
                        receive_sock,
                        False
                    ]
                )
                id = result.fetchone()[0]
                old_data = {}
                old_data["gift_sock"] = gift_sock
                old_data["requesting_user"] = requesting_id
                old_data["approving_user"] = approving_id
                old_data["receive_sock"] = receive_sock
                old_data["match_status"] = False
                return MatchOut(id=id, **old_data)


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
