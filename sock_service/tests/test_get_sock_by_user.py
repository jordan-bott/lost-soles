from main import app
from authenticator import authenticator
from queries.sock import SockQueries
from fastapi.testclient import TestClient
from datetime import datetime

client = TestClient(app)


time = datetime.now()


def fake_acc():
    return {
        "id": 3,
        "first_name": "Bruce",
        "last_name": "Wayne",
        "username": "Batman",
        "email": "batman@email.com",
        "address": "string",
        "profile_pic": "https://bit.ly/41Wqs0I",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": False,
        "type": "user",
        "created_on": str(time)
    }


class GetSockQuery:
    def get_by_user(self, user_id):
        sock_list = [
            {
                "id": 1,
                "user_id": user_id,
                "photo": "https://bit.ly/3VattZi",
                "color": "White",
                "pattern": "Solid",
                "size": "ML",
                "type": "Tube",
                "fabric": "Cotton",
                "style": "Sport",
                "brand": "Hanes",
                "gift": True,
                "match_status": "available",
                "created_on": str(time),
            }
        ]
        return sock_list


def test_get_socks_by_user_id():
    # Arrange
    app.dependency_overrides[SockQueries] = GetSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    user_id = 3
    expected = [
        {
            "id": 1,
            "user_id": 3,
            "photo": "https://bit.ly/3VattZi",
            "color": "White",
            "pattern": "Solid",
            "size": "ML",
            "type": "Tube",
            "fabric": "Cotton",
            "style": "Sport",
            "brand": "Hanes",
            "gift": True,
            "match_status": "available",
            "created_on": str(time),
        }
    ]

    # Act
    response = client.get(f"/api/socks/users/{user_id}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
