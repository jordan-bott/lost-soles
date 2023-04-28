from main import app
from authenticator import authenticator
from queries.sock import SockQueries
from fastapi.testclient import TestClient
from datetime import datetime

now = datetime.now()
client = TestClient(app)


def fake_acc():
    return {
        "id": 1,
        "first_name": "Juna",
        "last_name": "Branca",
        "username": "junab",
        "email": "juna",
        "address": "12345 Mountain st, Denver, CO, 80218",
        "profile_pic": "https://bit.ly/3L9hers",
        "sockstar_points": 100,
        "total_pairings": 5,
        "verified": False,
        "type": "user",
        "created_on": str(now)
        }


class CreateSockQuery:
    def create(self, sock, user_id):
        result = {
            "id": 1,
            "user_id": user_id,
            "match_status": "available",
            "created_on": str(now),
        }
        result.update(sock)
        return result


def test_create_sock():
    # Arrange
    app.dependency_overrides[SockQueries] = CreateSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    json = {
            "photo": "https://bit.ly/3AB0aW8",
            "color": "grey",
            "pattern": "plain",
            "size": "L",
            "type": "tube",
            "fabric": "cotton",
            "style": "casual",
            "brand": "Hanes",
            "gift": True
            }
    expected = {
            "id": 1,
            "user_id": 1,
            "photo": "https://bit.ly/3AB0aW8",
            "color": "grey",
            "pattern": "plain",
            "size": "L",
            "type": "tube",
            "fabric": "cotton",
            "style": "casual",
            "brand": "Hanes",
            "gift": True,
            "match_status": "available",
            "created_on": str(now),
    }

    # Act
    response = client.post("/api/socks", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
