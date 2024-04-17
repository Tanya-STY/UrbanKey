from flask import Flask, jsonify, make_response, Blueprint, request
from config import users, units  # Assuming you have imported the units collection
from middleware.TokenAuth import token_required, verify_token

financial_routes = Blueprint('financial_routes', __name__)

# Define global variables to store updated values
price_size = 500
price_parking = 1000
operation_cost = 5000
total = 0

# Route to get financial status
def get_financial_status(request):
    email = request.email
    user = users.find_one({'email': email}) # Find user for this specific email
    if user:
        unit = units.find_one({"$or": [{"occupant.email": email}, {"unit_owner.email": email}]})
        if unit:
            total_cost = unit.get('total_cost')
    
    return jsonify({
            'total_cost': total_cost,
        }), 200

# Route to update financial status
def update_financial_status(request):
    try:

        email = request.email
        role = request.role
        data = request.get_json()
        fee_size = int(data.get('feePerSquareFoot'))
        fee_parking = int(data.get('feePerParkingSpot'))
        
        # Take all units from the database
        for unit in units.find():
            # Get the current size of the unit
            current_size = unit.get('size', 0)

            # Multiply the current size by the price from the frontend
            total_size = current_size * fee_size
            
            current_parking = unit.get('number_parking', 0)
            
            total_parking = current_parking * fee_parking
            
            units.update_one({'_id': unit['_id']}, {"$set": {"total_size": total_size, "total_parking": total_parking}}, upsert=False)

        # Get data from request body
        global price_size, price_parking, operation_cost

        # Return updated financial status
        return jsonify({
            'message': 'Financial status updated successfully',
        }), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def update_financial_cost(request):
    
    try:
        data = request.get_json()
        operation_cost = int(data.get('operation_cost'))
        unit_id = data.get('operationName')
        unit = units.find_one({'unit_id': unit_id})
        if unit:
            fee_size = int(unit.get('total_size'))
            fee_parking = int(unit.get('total_parking'))
            total_cost = int((fee_size + fee_parking + operation_cost)/240)
            units.update_one({'_id': unit['_id']}, {"$set": {"total_cost": total_cost}}, upsert=False)
            
        return jsonify({
            'total_cost': total_cost
            }), 200
        
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500