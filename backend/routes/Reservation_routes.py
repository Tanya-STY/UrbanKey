from flask import Blueprint, request, jsonify
from controllers.Reservations import makeReservation, getReservations, getAllReservations
from middleware.TokenAuth import generate_access_token, generate_refresh_token, verify_refresh_token, token_required

reservation_routes = Blueprint('reservation_routes', __name__)


@reservation_routes.route("/MakeReservation", methods=['POST'])
@token_required
def makereservation_route():
        
    return makeReservation(request) 

@reservation_routes.route("/GetReservations", methods=['POST'])
def getreservation_route():
        
    return getReservations(request) 

@reservation_routes.route("/GetAllReservations", methods=['GET'])
def getallreservation_route():
        
    return getAllReservations(request) 