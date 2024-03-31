from flask import Blueprint

company_routes = Blueprint('company_routes', __name__)


@company_routes.route("/", methods=[])
def methodname():
    pass