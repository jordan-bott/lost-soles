from main import app
from authenticator import authenticator
from queries.sock import SockQueries
from fastapi.testclient import TestClient


client = TestClient(app)


def fake_acc():
    return {
        "id": 1,
        "first_name": "string",
        "last_name": "string",
        "username": "Kalani",
        "email": "string",
        "address": "string",
        "profile_pic": "string",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": "false",
        "type": "user",
        "created_on": "2023-04-18 22:47:33.447488"
        }


class GetSockQuery:
    def get_one_sock(self, sock_id):
        sock = {
            "id": sock_id,
            "user_id": 1,
            "photo": "string",
            "color": "string",
            "pattern": "string",
            "size": "string",
            "type": "string",
            "fabric": "string",
            "style": "string",
            "brand": "string",
            "gift": True,
            "match_status": "available",
            "created_on": "2023-04-18T19:09:04.973180",
            "username": "string",
            "email": "string",
            "profile_pic": "string",
            "sockstar_points": 0,
            "total_pairings": 0,
            "verified": False,
        }
        return sock


def test_get_sock():
    app.dependency_overrides[SockQueries] = GetSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    sock_id = 1
    user_id = 1
    expected = {
            "id": sock_id,
            "user_id": user_id,
            "photo": "string",
            "color": "string",
            "pattern": "string",
            "size": "string",
            "type": "string",
            "fabric": "string",
            "style": "string",
            "brand": "string",
            "gift": True,
            "match_status": "available",
            "created_on": "2023-04-18T19:09:04.973180",
            "username": "string",
            "email": "string",
            "profile_pic": "string",
            "sockstar_points": 0,
            "total_pairings": 0,
            "verified": False,
    }
    response = client.get(f"/api/socks/{sock_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
