from main import app
from authenticator import authenticator
from queries.sock import SockQueries
from fastapi.testclient import TestClient
from datetime import datetime


client = TestClient(app)

time = datetime.now()


def fake_acc():
    return {
        "id": 2,
        "first_name": "Kal",
        "last_name": "El",
        "username": "Superman",
        "email": "superman@email.com",
        "address": "12345 Superman St",
        "profile_pic": "https://bit.ly/40D7RFX",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": False,
        "type": "user",
        "created_on": str(time)
    }


class GetAllSocksQuery:
    def get_feed(self):
        socks = [
            {
                "id": 1,
                "user_id": 2,
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
                "username": "Superman",
                "email": "superman@email.com",
                "profile_pic": "https://bit.ly/40D7RFX",
                "sockstar_points": 0,
                "total_pairings": 0,
                "verified": False
            },
            {
                "id": 2,
                "user_id": 1,
                "photo": "https://bit.ly/3oKD0tW",
                "color": "Black",
                "pattern": "Solid",
                "size": "WM",
                "type": "Ankle",
                "fabric": "Wool",
                "style": "Modern",
                "brand": "Awesome Socks Club",
                "gift": True,
                "match_status": "available",
                "created_on": "2023-04-18T19:09:04.973180",
                "username": "sockluvr98",
                "email": "sockluvr98@email.com",
                "profile_pic":
                "https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg",
                "sockstar_points": 0,
                "total_pairings": 0,
                "verified": False
            }
        ]
        return socks


def test_get_all_socks():
    # Arrange
    app.dependency_overrides[SockQueries] = GetAllSocksQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    expected = [
            {
                "id": 1,
                "user_id": 2,
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
                "username": "Superman",
                "email": "superman@email.com",
                "profile_pic": "https://bit.ly/40D7RFX",
                "sockstar_points": 0,
                "total_pairings": 0,
                "verified": False
            },
            {
                "id": 2,
                "user_id": 1,
                "photo": "https://bit.ly/3oKD0tW",
                "color": "Black",
                "pattern": "Solid",
                "size": "WM",
                "type": "Ankle",
                "fabric": "Wool",
                "style": "Modern",
                "brand": "Awesome Socks Club",
                "gift": True,
                "match_status": "available",
                "created_on": "2023-04-18T19:09:04.973180",
                "username": "sockluvr98",
                "email": "sockluvr98@email.com",
                "profile_pic":
                "https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg",
                "sockstar_points": 0,
                "total_pairings": 0,
                "verified": False
            }
        ]

    # Act
    response = client.get("/api/socks")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
