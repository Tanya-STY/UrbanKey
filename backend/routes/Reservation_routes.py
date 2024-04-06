from flask import Blueprint, request, jsonify
from controllers.Reservations import makeReservation, getReservations, getAllReservations

reservation_routes = Blueprint('reservation_routes', __name__)


@reservation_routes.route("/MakeReservation", methods=['POST'])
def makereservation_route():
        
    return makeReservation(request) 

@reservation_routes.route("/GetReservations", methods=['POST'])
def getreservation_route():
        
    return getReservations(request) 

@reservation_routes.route("/GetAllReservations", methods=['GET'])
def getallreservation_route():
        
    return getAllReservations(request) 