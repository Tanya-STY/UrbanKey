from flask import Blueprint, request, jsonify
from controllers.Reservations import makeReservation

reservation_routes = Blueprint('reservation_routes', __name__)


@reservation_routes.route("/MakeReservation", methods=['GET'])
def makereservation_route():
        
    return makeReservation(request) 