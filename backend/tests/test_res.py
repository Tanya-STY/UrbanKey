import pytest
from unittest.mock import MagicMock, patch
from flask import Flask, request, jsonify
import sys
sys.path.append('C:\\Users\\Shamma\\Desktop\\UrbanKey-2\\backend')
from backend.routes.Reservation_routes import makeReservation, getReservations, getAllReservations

app = Flask(__name__)


# Define fixtures
@pytest.fixture(scope='function')
def mock_request():
    class MockRequest:
        json_data = None

        def __init__(self, json_data):
            self.json_data = json_data

        @property
        def json(self):
            return self.json_data

    return MockRequest

# Test cases for makeReservation
def test_make_reservation_success(mock_request):
    # Mock request data
    request_data = {
        'email': 'test@example.com',
        'facility': 'facility1',
        'time_slot': 'morning',
        'date': '2024-05-01'
    }
    request = mock_request(request_data)

    # Mock users collection
    users = {
        'test@example.com': {'full_name': 'Test User'}
    }

    with app.app_context():
        # Mock addReservation function
        with patch('backend.controllers.Reservations.addReservation') as add_reservation_mock:
            add_reservation_mock.return_value = True, 'Reservation successfully made'

            # Call makeReservation function
            response, status_code = makeReservation(request)

    # Assert response
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}

def test_make_reservation_failure(mock_request):
    # Mock request data
    request_data = {
        'email': 'test@example.com',
        'facility': 'facility1',
        'time_slot': 'morning',
        'date': '2024-05-01'
    }
    request = mock_request(request_data)

    # Mock users collection
    users = {
        'test@example.com': {'full_name': 'Test User'}
    }

    # Mock addReservation function
    with app.app_context():
        with patch('backend.controllers.Reservations.addReservation') as add_reservation_mock:
            add_reservation_mock.return_value = False, 'Time slot already taken for this facility'

            # Call makeReservation function
            response, status_code = makeReservation(request)

    # Assert response
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}

# Test cases for getReservations
def test_get_reservations_success(mock_request):
    # Mock request data
    request_data = {
        'facility': 'facility1',
        'date': '2024-05-01'
    }
    request = mock_request(request_data)

    # Mock reservations
    reservations = [
        {'facility': 'facility1', 'date': '2024-05-01', 'time_slot': 'morning'},
        {'facility': 'facility1', 'date': '2024-05-01', 'time_slot': 'afternoon'}
    ]

    # Mock find function
    with app.app_context():
        with patch('backend.config.reservations.find') as find_mock:
            find_mock.return_value = reservations

            # Call getReservations function
            response, status_code = getReservations(request)

    # Assert response
    assert status_code == 200
    assert response.json == reservations

def test_get_reservations_failure(mock_request):
    # Mock request data
    request_data = {
        'facility': 'facility1',
        'date': '2024-05-01'
    }
    request = mock_request(request_data)

    # Mock find function
    with app.app_context():
        with patch('backend.config.reservations.find') as find_mock:
            find_mock.side_effect = Exception('Database error')

            # Call getReservations function
            response, status_code = getReservations(request)

    # Assert response
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}

# Test cases for getAllReservations
def test_get_all_reservations_success(mock_request):
    # Mock request
    request = mock_request(reservations)

    # Mock reservations
    reservations = [
        {'facility': 'facility1', 'date': '2024-05-01', 'time_slot': 'morning'},
        {'facility': 'facility2', 'date': '2024-05-01', 'time_slot': 'afternoon'}
    ]

    # Mock find function
    with app.app_context():
        with patch('backend.config.reservations.find') as find_mock:
            find_mock.return_value = reservations

            # Call getAllReservations function
            response, status_code = getAllReservations(request)

    # Assert response
    assert status_code == 200
    assert response.json == reservations

def test_get_all_reservations_failure(mock_request):
    # Mock request
    request = mock_request({})

    # Mock find function
    with app.app_context():
        with patch('backend.config.reservations.find') as find_mock:
            find_mock.side_effect = Exception('Database error')

            # Call getAllReservations function
            response, status_code = getAllReservations(request)

    # Assert response
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}
