from pydantic import BaseModel, Field
from queries.pool import pool
from typing import List, Union, Optional

class VerificationIn(BaseModel):
    user_id: int
    license: str
    verification_status: str


class VerificationOut(BaseModel):
    id: int
    user_id: int
    license: str
    verification_status: str


class VerificationQueries:
    def create(self, info: VerificationIn, user_id: int) -> VerificationOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO verifications
                    (
                        user_id,
                        license,
                        verification_status
                    )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user_id,
                        info.license,
                        "pending"
                    ]
                )
                id=result.fetchone()[0]
                data=info.dict()
                data["user_id"]=user_id
                data["verification_status"]="pending"
                return VerificationOut(id=id,**data)
