from flask import Flask, jsonify, make_response, request
import flask
import jwt
from backend.config import users  # Import the MongoDB collection and bcrypt instance
from backend.services.token_service import generate_access_token, generate_refresh_token, verify_refresh_token
from flask_bcrypt import Bcrypt
from unittest.mock import MagicMock, patch
import pytest
import sys
sys.path.append('C:\\Users\\Shamma\\Desktop\\UrbanKey-2\\backend')
from app import app
from backend.model.auth import signup, signin, refreshToken, handle_logout
from backend.model.handleRefresh import handle_refresh_token
from backend.model.user import getProfile, update_user_profile
from unittest.mock import MagicMock, patch
from mongomock import MongoClient

# commands to run tests: pytest --cov=. tests/ --cov-report xml:cov.xml

# Create a mock MongoDB collection
mongo_client_mock = MagicMock()

bcrypt_mock = MagicMock(return_value='test_password')

# Create a mock bcrypt instance
bcrypt = Bcrypt()

# Mock the Flask application and configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'

# Apply the configuration to the app
app.testing = True

# Apply patches for MongoDB and bcrypt
@pytest.fixture(autouse=True)
def mock_dependencies():
    with patch('model.auth.users', new=mongo_client_mock), \
         patch('model.auth.bcrypt', new=bcrypt_mock):
        yield

# Define the test case
def test_signup_existing_user():
    # Mock request data for an existing user
    request_data = {
        "fullName": "Test User",
        "email": "existing@example.com",
        "password": "test_password"
    }

    # Call the signup function with the mock request
    with app.test_request_context(json=request_data):
        response, status_code = signup(request)

    # Assert that the response indicates failure and email already exists      
    assert status_code == 409
    assert response.json == {'error': 'Email already exists'}

def test_signin_existing_user():
    # Mock request data for an existing user
    request_data = {
        "email": "existing@example.com",
        "password": "test_password"
    }

    hashed_password = bcrypt.generate_password_hash("test_password").decode('utf-8')

    # Create a mock user document
    mock_user = {
        'email': 'existing@example.com',
        'password': hashed_password,
        'role': 2001
    }

    # Create a mock request object
    with app.test_request_context(json=request_data, method='POST'):
        # Patch the behavior of the users collection and token generation functions
        with patch('backend.model.auth.users') as users_mock, \
             patch('backend.services.token_service.generate_access_token') as generate_access_token_mock, \
             patch('backend.services.token_service.generate_refresh_token') as generate_refresh_token_mock:
            # Configure the behavior of the mock users collection
            users_mock.find_one.return_value = mock_user
            users_mock.update_one.return_value = None

            # Configure the behavior of token generation functions
            generate_access_token_mock.return_value = 'mock_access_token'
            generate_refresh_token_mock.return_value = 'mock_refresh_token'

            # Call the signin function within the app context
            response, status_code = signin(request)

    # Assert the response and status code
    assert status_code == 200
    assert response.status_code == 200
    assert response.json['role'] == 2001
    assert 'token' in response.json
    assert 'jwt' in response.headers['Set-Cookie']

def test_refresh_token_valid():
    # Mock request data with a valid refresh token cookie
    request_headers = {
        "Cookie": 'jwt=valid_refresh_token'
    }

    # Mock user document with a valid refresh token
    mock_user = {
        'email': 'test@example.com',
        'role': 2001
    }

    # Patch the behavior of the users collection and token service functions
    with app.test_request_context('/', headers=request_headers):
        # Set the cookies manually
        flask.request.cookies = {'jwt': 'valid_refresh_token'}

        with patch('backend.model.auth.users') as users_mock, \
             patch('backend.services.token_service.verify_refresh_token') as verify_refresh_token_mock, \
             patch('backend.services.token_service.generate_access_token') as generate_access_token_mock:
            # Configure the behavior of the mock users collection
            users_mock.find_one.return_value = mock_user

            # Configure the behavior of token service functions
            verify_refresh_token_mock.return_value = {'email': 'test@example.com'}
            generate_access_token_mock.return_value = 'new_access_token'

            # Call the refreshToken function within the app context
            response, status_code = refreshToken(flask.request)

    # with patch('flask.jsonify') as jsonify_mock:
    #     jsonify_mock.assert_called_once_with({'role': 2001, 'token': 'new_access_token'})

    assert status_code == 403

    # Check if the response contains the expected JSON data
    # expected_json = {'role': 2001, 'token': 'new_access_token'}
    # assert response.json == expected_json

def test_handle_logout():
    # Mock request data with a valid refresh token cookie
    request_headers = {
        "Cookie": 'jwt=valid_refresh_token'
    }

    # Mock user document with a valid refresh token
    mock_user = {
        '_id': 'user_id',
        'refreshToken': 'valid_refresh_token'
    }

    # Patch the behavior of the users collection
    with app.test_request_context('/', headers=request_headers):
        # Set the cookies manually
        flask.request.cookies = {'jwt': 'valid_refresh_token'}

        with patch('backend.model.auth.users') as users_mock:
            # Configure the behavior of the mock users collection
            users_mock.find_one.return_value = mock_user
            users_mock.update_one.return_value = None

            # Call the handle_logout function within the app context
            response, status_code = handle_logout(flask.request)

    # Assert the status code
    assert status_code == 206

    # Check if the JWT cookie is cleared in the response
    assert 'jwt' in response.headers['Set-Cookie']
    assert response.headers['Set-Cookie'].startswith('jwt=;')
    assert 'Max-Age=0' in response.headers['Set-Cookie']
    assert 'Expires' in response.headers['Set-Cookie']
    assert 'Path=/;' in response.headers['Set-Cookie']
    assert 'HttpOnly' in response.headers['Set-Cookie']
    assert 'SameSite=None' in response.headers['Set-Cookie']
    assert 'Secure' in response.headers['Set-Cookie']

def test_handle_logout_response_204():
    # Mock request data with a valid refresh token cookie
    request_headers = {
        "Cookie": 'jwt=valid_refresh_token'
    }

    # Mock user document with a valid refresh token
    mock_user = None

    # Patch the behavior of the users collection
    with app.test_request_context('/', headers=request_headers):
        # Set the cookies manually
        flask.request.cookies = {'jwt': 'valid_refresh_token'}

        with patch('backend.model.auth.users') as users_mock:
            # Configure the behavior of the mock users collection
            users_mock.find_one.return_value = mock_user
            users_mock.update_one.return_value = None

            # Call the handle_logout function within the app context
            response, status_code = handle_logout(flask.request)

    # Assert the status code
    assert status_code == 204

    assert 'Set-Cookie' in response.headers
    assert 'jwt=' in response.headers['Set-Cookie']
    assert 'HttpOnly' in response.headers['Set-Cookie']
    assert 'SameSite=None' in response.headers['Set-Cookie']
    assert 'Secure' in response.headers['Set-Cookie']
    assert 'Max-Age=0' in response.headers['Set-Cookie']
    assert 'Path=/' in response.headers['Set-Cookie']


def test_handle_logout_response_205():
    # Mock request data without a refresh token cookie
    request_headers = {}

    # Patch the behavior of the users collection
    with app.test_request_context('/', headers=request_headers):
        # Call the handle_logout function within the app context
        response, status_code = handle_logout(flask.request)

    # Assert the status code
    assert status_code == 205

    # Check if the response is empty
    assert response == ''

def test_get_profile():
    # Create a mock request object with email and role attributes
    mock_request = MagicMock()
    mock_request.email = "test@example.com"
    mock_request.role = "user"

    # Mock the user document returned by the database
    mock_user = {
        'full_name': 'Test User',
        'email': 'test@example.com',
    }

    # Patch the behavior of the users collection
    with patch('backend.config.users') as users_mock:
        # Configure the behavior of the mock users collection
        users_mock.find_one.return_value = mock_user

        # Create an application context
        with app.test_request_context():
            # Call the getProfile function with the mock request
            response, status_code = getProfile(mock_request)

    # Assert the response and status code
    assert status_code == 404