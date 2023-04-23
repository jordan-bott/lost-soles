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
        "username": "junab",
        "email": "string",
        "address": "string",
        "profile_pic": "string",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": "false",
        "type": "user",
        "created_on": "2023-04-18 22:47:33.447488"
        }


class CreateSockQuery:
    def create(self, sock, user_id):
        result = {
            "id": 1,
            "user_id": user_id,
            "match_status": "available",
            "created_on": "2023-04-18T19:09:04.973180",
        }
        result.update(sock)
        return result


def test_create_sock():
    # Arrange
    app.dependency_overrides[SockQueries] = CreateSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    json = {
            "photo": "string",
            "condition": 0,
            "color": "string",
            "pattern": "string",
            "size": "string",
            "type": "string",
            "fabric": "string",
            "style": "string",
            "brand": "string",
            "gift": True
            }
    expected = {
            "id": 1,
            "user_id": 1,
            "photo": "string",
            "condition": 0,
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
    }

    # Act
    response = client.post("/api/socks", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
