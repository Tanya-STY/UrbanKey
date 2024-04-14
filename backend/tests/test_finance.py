import pytest
from unittest.mock import MagicMock, patch
from flask import json


from app import app  

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from routes.Financial_routes import financial_routes

# Mock MongoDB setup
@pytest.fixture
def mongo_client():
    client = MagicMock(spec=MongoClient)
    db = client.finance_database
    return client

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.register_blueprint(financial_routes)  # Register the blueprint
    with app.test_client() as test_client:
        yield test_client

# Mock the database interactions to ensure no real database calls
@pytest.fixture(autouse=True)
def mock_db(mongo_client):
    with patch('your_application.MongoClient', return_value=mongo_client):
        yield

def test_calculate_financials():
    result = calculate_financials(100, 5)
    assert result == 500  

def test_get_data():
    data = get_data()
    assert isinstance(data, list)  
    assert len(data) > 0  

def test_api_get_financials(client):
    response = client.get('/api/financials')
    assert response.status_code == 200
    assert 'application/json' in response.content_type

def test_api_update_financials(client):
    response = client.put('/api/financials', json={'data': 123})
    assert response.status_code == 200
    assert json.loads(response.data.decode('utf-8'))['success'] == True
