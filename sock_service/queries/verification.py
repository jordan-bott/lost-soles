from pydantic import BaseModel, Field
from queries.pool import pool
from typing import List, Union, Optional

class Error(BaseModel):
    message: str

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

    def get_all_verifications(self) -> Union[List[VerificationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    vrfy=db.execute(
                        """
                        SELECT *
                        FROM verifications
                        ORDER BY verification_status
                        """,
                    )
                    vrfy=[]
                    for v in db:
                        verify=VerificationOut(
                            id=v[0],
                            user_id=v[1],
                            license=v[2],
                            verification_status=v[3]
                        )
                        vrfy.append(verify)
                    return vrfy
        except Exception as e:
            print("Get All verifications error", e)
            return {"Error": "could not get list of verifications"}


    def approve_verification(self, id: int) -> VerificationOut:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        vrfy=db.execute(
                            """
                            UPDATE verifications
                            SET verification_status = 'approved'
                            WHERE id = %s
                            RETURNING *;
                            """,
                            [id]
                        )
                        vrfy=vrfy.fetchone()
                        verify=VerificationOut(
                            id=vrfy[0],
                            user_id=vrfy[1],
                            license=vrfy[2],
                            verification_status=vrfy[3]
                        )
                        return verify
            except Exception as e:
                print("Approve verification error", e)
                return {"Error": "could not approve verification"}


    def reject_verification(self, id: int) -> VerificationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    vrfy=db.execute(
                        """
                        UPDATE verifications
                        SET verification_status = 'rejected'
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [id]
                    )
                    vrfy=vrfy.fetchone()
                    verify=VerificationOut(
                        id=vrfy[0],
                        user_id=vrfy[1],
                        license=vrfy[2],
                        verification_status=vrfy[3]
                    )
                    return verify
        except Exception as e:
            print("Reject verification error", e)
            return {"Error": "could not reject verification"}
