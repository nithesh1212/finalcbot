from flask import Blueprint
from app.commons import build_response

nlu = Blueprint('nlu_blueprint', __name__, url_prefix='/nlu')


from app.nlu.tasks import train_models


@nlu.route('/build_models/<botId>', methods=['POST'])
def build_models(botId):
    """
    Build Intent classification and NER Models
    :return:
    """
    train_models(botId)
    return build_response.sent_ok()
