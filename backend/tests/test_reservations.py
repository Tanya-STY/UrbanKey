import pytest
from flask_bcrypt import Bcrypt
from unittest.mock import MagicMock, patch
from flask import Flask, request, jsonify
import sys
sys.path.append('C:\\Users\\vdolg\\UrbanKey\\backend')

import pytest
from routes.Reservation_routes import reservation_routes
from app import app 

from backend.config import reservations
from backend.config import regkey

from unittest.mock import MagicMock, patch
from mongomock import MongoClient

from RegKey import RegKeyClass
from Reservations import ReservationClass


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_all_reservations(client):
    """Test fetching all reservations."""
    response = client.get('/GetAllReservations')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Expecting a list of reservations

def test_get_reservations(client):
    """Test fetching reservations for a specific facility and date."""
    response = client.post('/GetReservations', json={'facility': 'Sky Lounge', 'date': '2024-04-26'})
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Expecting a list of reservations

def test_make_reservation_valid(client):
    """Test making a reservation with all valid inputs."""
    reservation_data = {
        'email': 'i@hotmail.com',
        'name': 'i',
        'facility': 'Sky Lounge',
        'date': '2024-04-26',
        'time_slot': '01:00 PM',
        'key_value': 'R1234567'  # Assuming this is a valid and activated key
    }
    response = client.post('/MakeReservation', json=reservation_data)
    assert response.status_code == 200
    assert response.json['message'] == 'Reservation successfully submitted!'

def test_make_reservation_with_invalid_key(client):
    """Test making a reservation with an invalid or deactivated key."""
    reservation_data = {
        'email': 'test@example.com',
        'facility': 'Sky Lounge',
        'date': '2024-04-27',
        'time_slot': '02:00 PM',
        'key_value': 'R9999999'  # Assuming an invalid or deactivated key
    }
    response = client.post('/MakeReservation', json=reservation_data)
    assert response.status_code == 401  # Assuming unauthorized due to invalid key

def test_reservation_data_integrity(client):
    """Test that the data in reservations are in the correct format."""
    response = client.get('/GetAllReservations')
    assert response.status_code == 200
    for reservation in response.json:
        assert 'email' in reservation
        assert 'name' in reservation
        assert 'facility' in reservation
        assert 'date' in reservation
        assert 'time_slot' in reservation
        assert '@' in reservation['email']  # Simple email format check

def test_reservation_with_deactivated_key(client):
    """Ensure that reservations cannot be made with deactivated keys."""
    reservation_data = {
        'email': 'test@example.com',
        'facility': 'Sky Lounge',
        'date': '2024-04-27',
        'time_slot': '03:00 PM',
        'key_value': 'R1234567'  # Assuming this is a known deactivated key
    }
    response = client.post('/MakeReservation', json=reservation_data)
    assert response.status_code == 403  # Assuming forbidden due to deactivated key
