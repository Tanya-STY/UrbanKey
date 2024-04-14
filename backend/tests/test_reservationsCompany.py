import pytest
from flask import Flask, json
from unittest.mock import patch
import mongomock 
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

# Import the Flask application
from app import app

@pytest.fixture
def client():
    # Configure the Flask app for testing
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Assuming that 'Reservation' is located under the backend/controllers directory, adjust the patch path
@patch('controllers.Reservation.Reservation.get_all')
def test_get_all_reservations(mock_reservation, client):
    # Arrange: Setup the mock to return specific data
    mock_reservation.return_value = [
        {'name': 'John Doe', 'email': 'john@example.com', 'facility': 'Pool', 'date': '2024-04-26', 'time_slot': '01:00 PM'}
    ]
    
    # Act: Make a request to the get all reservations endpoint
    response = client.get('/get_all_reservations')
    
    # Assert: Check the response from the endpoint
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['name'] == 'John Doe'

@patch('controllers.Reservation.Reservation.search_by_criteria')
def test_search_reservations(mock_reservation, client):
    # Arrange: Mock the search by criteria function to return a specific response
    mock_reservation.return_value = [
        {'name': 'John Doe', 'email': 'john@example.com', 'facility': 'Pool'}
    ]
    
    # Act: Perform a POST request to search for reservations
    response = client.post('/search_reservations', json={'search_term': 'John'})
    
    # Assert: Verify that the response is correct and contains expected data
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['facility'] == 'Pool'
    assert 'email' in response.json[0]  # Additional check for presence of 'email' in the response
