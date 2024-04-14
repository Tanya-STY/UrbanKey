import pytest
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from unittest.mock import patch

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import app


@pytest.fixture
def test_client(): 
    
    with app.test_client() as test_client:
        app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
        yield test_client

def test():
    ##test test just to see if it works
    assert 1 == 1
    
def test_index_route(test_client):
    ##testing the index
    response = test_client.get('/')
    assert response.status_code == 200


@patch('app.users.find_one')
@patch('app.users.insert_one')
def test_signup_route_with_mock_find_one(mock_find_one, mock_insert_one, test_client):

    
    mock_find_one.side_effect = Exception("Server error")

    mock_insert_one.return_value = 5

    response = test_client.post('/SignUp', json={
        "fullName": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    })
    print(response.status_code)
    print(response.data)
    assert response.status_code == 201

@patch('app.users.find_one')
def test_profile_route_with_mocked_find_one(mock_find_one, test_client):

    mock_find_one.return_value = {
        'full_name': 'Test User',
        'email': 'test@example.com',
        'province': 'Ontario',
        'city': 'Toronto'
    }

    response = test_client.get('/Profile', headers={'Authorization': 'Bearer mock_token'})

    assert response.status_code == 200

    assert b'Test User' in response.data
    assert b'test@example.com' in response.data
    assert b'Ontario' in response.data
    assert b'Toronto' in response.data


def test_invalid_signup_request(test_client):

    response = test_client.post('/SignUp', json={})
    

    assert response.status_code == 400

@patch('app.users.find_one')
@patch('app.users.insert_one')
def test_signup_server_error(mock_find_one, mock_insert_one, client):

    mock_find_one.side_effect = Exception("Server error")
    

    response = client.post('/SignUp', json={
        "fullName": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    })


    assert response.status_code == 500


