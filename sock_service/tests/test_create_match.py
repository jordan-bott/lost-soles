from main import app
from authenticator import authenticator
from queries.match import MatchQueries
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
        "email": "juna@gmail.com",
        "address": "12345 Mountain st. Denver, CO, 80218",
        "profile_pic": "https://bit.ly/3L9hers",
        "sockstar_points": 100,
        "total_pairings": 5,
        "verified": False,
        "type": "user",
        "created_on": str(now)
        }

class CreateMatchQuery:
    def create(self, approving_id, requesting_id, receive_sock, gift_sock):
        result = {
            "id": 1,
            "requesting_user": requesting_id,
            "approving_user": approving_id,
            "gift_sock": gift_sock,
            "receive_sock": receive_sock,
            "match_status": True,
            "created_on": str(now)
        }
        return result

def test_create_match():
    app.dependency_overrides[MatchQueries] = CreateMatchQuery
    app.dependency_overrides[authenticator.get_current_account_data] = fake_acc
    expected= {
        "id": 1,
        "requesting_user": 1,
        "approving_user": 2,
        "gift_sock": 1,
        "receive_sock": 2,
        "match_status": True,
        "created_on": str(now),
    }

    approving_id = 2
    receive_sock = 2
    gift_sock = 1


    response = client.post(f'/api/matches?receive_sock={receive_sock}&gift_sock={gift_sock}&approving_id={approving_id}')

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
