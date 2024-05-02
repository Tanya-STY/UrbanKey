import pytest
from flask import Flask, json
from app import app  # Import the Flask app

# Assuming the User.py file contains a Flask Blueprint or similar that needs to be imported
from user import user_routes

app.register_blueprint(user_blueprint)  # Register the Blueprint with the Flask application

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_profile_update(client):
    """Test the profile update endpoint."""
    # Mock data simulating a user profile update request
    mock_request_data = {
        "name": "New Name",
        "email": "new@example.com",
        "province": "New Province",
        "city": "New City",
        "num": "1234567890",
        "num2": "0987654321",
        "key": "ABCD1234",
        "address": "123 New Address"
    }
    # Headers may include authentication tokens etc., if required
    headers = {
        'Authorization': 'Bearer fake-token'
    }
    response = client.post('/user/profile/update', data=json.dumps(mock_request_data), headers=headers, content_type='application/json')
    assert response.status_code == 200
    assert response.json['message'] == 'Profile updated successfully'

def test_fetch_user_profile(client):
    """Test the endpoint that fetches user profile data."""
    headers = {
        'Authorization': 'Bearer fake-token'
    }
    response = client.get('/Profile', headers=headers)
    assert response.status_code == 200
    # Assuming the response includes user details
    assert 'name' in response.json and 'email' in response.json

# More tests can be added depending on the specific endpoints and logic in your User.py controller
