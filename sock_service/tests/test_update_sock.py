from main import app
from authenticator import authenticator
from queries.sock import SockQueries
from fastapi.testclient import TestClient
from datetime import datetime


client = TestClient(app)


def fake_acc():
    return {
        "id": 4,
        "first_name": "John",
        "last_name": "Doe",
        "username": "sockluvr98",
        "email": "sockluvr98@email.com",
        "address": "12345 Sock St Sockerton SC 50674",
        "profile_pic":
        "https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg",
        "sockstar_points": 0,
        "total_pairings": 0,
        "verified": "false",
        "type": "user",
        "created_on": "2023-04-18 22:47:33.447488"
        }


time = datetime.now()


class UpdateSockQuery:
    def update(self, id, info):
        result = {
            "id": id,
            "user_id": 4,
            "photo": info.photo,
            "color": info.color,
            "pattern": info.pattern,
            "size": info.size,
            "type": info.type,
            "fabric": info.fabric,
            "style": info.style,
            "brand": info.brand,
            "gift": True,
            "match_status": "pending",
            "created_on": str(time),
        }
        return result


def test_update_sock():
    app.dependency_overrides[SockQueries] = UpdateSockQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc

    json = {
        "photo": "bit.ly/40FImnA",
        "condition": 2,
        "color": "Purple",
        "pattern": "Other",
        "size": "WS",
        "type": "Crew",
        "fabric": "Cotton",
        "style": "Modern",
        "brand": "Bombas",
        "gift": True,
    }

    expected = {
        "id": 1,
        "user_id": 4,
        "photo": "bit.ly/40FImnA",
        "color": "Purple",
        "pattern": "Other",
        "size": "WS",
        "type": "Crew",
        "fabric": "Cotton",
        "style": "Modern",
        "brand": "Bombas",
        "gift": True,
        "match_status": "pending",
        "created_on": str(time),
    }

    user_id = 4
    id = 1

    response = client.put(f"/api/users/{user_id}/socks/{id}", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
