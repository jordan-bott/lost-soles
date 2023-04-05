from pydantic import BaseModel
from queries.pool import pool

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


class SockQueries():

    def get(self, id: int) -> SockOut:
        pass

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
                            gift
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        info.gift
                    ]
                )
                id = result.fetchone()[0]
                old_data = info.dict()
                old_data["user_id"] = user_id
                return SockOut(id=id, **old_data)
