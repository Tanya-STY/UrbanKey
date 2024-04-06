from flask import jsonify, make_response, request
from datetime import datetime
from config import reservations, users # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token, verify_refresh_token, token_required # middleware functions handle authentication tokens and session management
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def addReservation(email, name, facility, time_slot, date):
        # Check if the time slot is already taken for that facility
        existing_reservation = reservations.find_one({
            'email': email,
            'name': name,
            'facility': facility,
            'date': date,
            'time_slot': time_slot
        })
        if existing_reservation:
            return False, "Time slot already taken for this facility"
        else:
            # Create new reservation
            new_reservation = {
            'email': email,
            'name': name,
            'facility': facility,
            'date': date,
            'time_slot': time_slot,
            #'created_at': datetime.now()
            }
            # Add to database
            reservations.insert_one(new_reservation)
            return True, "Reservation successfully made"

def makeReservation(request):
    try:
        email = request.email
        data = request.json
        user = users.find_one({"email": email})
        if user:
                name = user.get('full_name')
                facility = data.get('facility')
                date = data.get('date')
                time_slot = data.get('time_slot')
                addReservation(email, name, facility, date, time_slot)

        return jsonify({'message': 'User updated successfully'}), 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    
def getReservations(request):
    try:
        data = request.json
        facility = data.get('facility')
        date = data.get('date')
        reservations_list = list(reservations.find({
            'facility': facility,
            'date': date,
        }, {'_id': 0}))
        return jsonify(reservations_list), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def getAllReservations(request):
    try:
        reservations_list = list(reservations.find())
        for reservation in reservations_list:
            reservation.pop('_id', None)
        return jsonify(reservations_list), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

