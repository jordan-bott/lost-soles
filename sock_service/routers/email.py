from fastapi import (
    APIRouter,
)
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType


conf = ConnectionConfig(
    MAIL_USERNAME="lostsoles.findyoursolemate",
    MAIL_PASSWORD="poznosxainrkwagl",
    MAIL_FROM="lostsoles.findyoursolemate@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_FROM_NAME="Lost Soles",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

router = APIRouter()


@router.post("/api/email/request")
async def request_send(user_email: str, match_id: str) -> dict:
    html = f"""
    <p>Hello!</p>
    <p> Someone has requested to match with your sock. Please go to
    https://lost-soles.gitlab.io/module3-project-gamma/matches/{match_id}
    to accept or reject the match.</p>
    <p>Best,<p>
    <p>Lost Soles Dev Team</p>
    """

    message = MessageSchema(
        subject="Someone has requested to match with your sock!",
        recipients=[user_email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}


@router.post("/api/email/receive")
async def receive_send(user_email: str, username: str) -> dict:
    html = f"""
    <p>Hello!</p>
    <p> Great news! Both sock owners have agreed to a match.
    Your lone sole should be a lot less lonely soon! {username}
    will be putting your sock in the mail shortly. </p>
    <p>Best,<p>
    <p>Lost Soles Dev Team</p>
    """

    message = MessageSchema(
        subject="Someone has requested to match with your sock!",
        recipients=[user_email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}


@router.post("/api/email/send")
async def gift_send(user_email: str,
                    username: str,
                    user_address: str) -> dict:
    html = f"""
    <p>Hello!</p>
    <p> Great news! Both sock owners have agreed to a match.
    Please package up your lone sole and send it to
    {username} at {user_address} as soon as possible! </p>
    <p>Best,<p>
    <p>Lost Soles Dev Team</p>
    """

    message = MessageSchema(
        subject="Someone has requested to match with your sock!",
        recipients=[user_email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}
