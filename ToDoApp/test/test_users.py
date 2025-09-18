from .utils import *
from ..routers.users import get_db, get_current_user
from fastapi import status
from ..models import Users

app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user

def test_return_user(test_user):
    response = client.get("/user")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['username'] == 'testuser'
    assert response.json()['email'] == 'test@gmail.com'
    assert response.json()['firstname'] == 'test'
    assert response.json()['lastname'] == 'user'
    assert response.json()['role'] == 'admin'
    assert response.json()['phone_number'] == '(111)-111-1111'

def test_change_password_success(test_user):
    response = client.put("/user/password", json={"old_password": "testpassword",
                                                "new_password": "newpassword"})
    assert response.status_code == status.HTTP_204_NO_CONTENT

def test_change_password_invalid_current_password(test_user):
    response = client.put("/user/password", json={"old_password": "wrongpassword",
                                                  "new_password": "newpassword"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Wrong old password"}

def test_phone_number_success(test_user):
    response = client.put("/user/phone_number?new_phone_number=1234567890")
    assert response.status_code == status.HTTP_204_NO_CONTENT