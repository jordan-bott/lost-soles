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
        "username": "testuser",
        "email": "string",
        "address": "string",
        "profile_pic": "string",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": "false",
        "type": "user",
        "created_on": "2023-04-18 22:47:33.447488"
        }


class DeleteSockQuery:
    def delete(self, sock_id):
        return {"message": "Sock deleted successfully"}


def test_delete_sock():
    # Arrange
    app.dependency_overrides[SockQueries] = DeleteSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    sock_id = 1
    user_id = 1
    expected = {"message": "Sock deleted successfully"}

    # Act
    response = client.delete(f"/api/users/{user_id}/socks/{sock_id}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
