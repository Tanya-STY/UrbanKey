import pytest
from flask import Flask, json
from unittest.mock import patch
import mongomock
from app import app  

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('backend.models.Reservation')
def test_make_reservation(mock_reservation, client):
    # Arrange
    reservation_data = {
        'email': 'user@example.com',
        'facility': 'Tennis Court',
        'date': '2024-05-01',
        'time_slot': '02:00 PM'
    }
    mock_reservation.make.return_value = {'status': 'success', 'message': 'Reservation made successfully'}
    
    # Act
    response = client.post('/make_reservation', json=reservation_data)
    
    # Assert
    assert response.status_code == 200
    assert response.json == {'status': 'success', 'message': 'Reservation made successfully'}

@patch('backend.models.Reservation')
def test_fetch_reservations(mock_reservation, client):
    # Arrange
    mock_reservation.fetch_all_for_facility.return_value = [
        {'date': '2024-05-01', 'time_slot': '02:00 PM', 'facility': 'Tennis Court'}
    ]
    
    # Act
    response = client.post('/fetch_reservations', json={'facility': 'Tennis Court', 'date': '2024-05-01'})
    
    # Assert
    assert response.status_code == 200
    assert response.json[0]['facility'] == 'Tennis Court'


