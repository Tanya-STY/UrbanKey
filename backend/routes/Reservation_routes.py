from flask import Blueprint

reservation_routes = Blueprint('reservation_routes', __name__)


@reservation_routes.route("/", methods=[])
def methodname():
    pass