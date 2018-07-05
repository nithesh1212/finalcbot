from flask import Blueprint, request,Response
import json
from bson.objectid import ObjectId
from app.agents.models import Bot
from app.commons import build_response
from bson.json_util import dumps



bots = Blueprint('bots_blueprint', __name__,
                    url_prefix='/bot')



@bots.route('/config', methods=['PUT'])
def set_config(bot_name):
    """
    Read bot config
    :param bot_name:
    :return:
    """

    content = request.get_json(silent=True)
    bot = Bot.objects.get(name=bot_name)
    bot.config = content
    bot.save()
    return build_response.sent_ok()

@bots.route('/config', methods=['GET'])
def get_config(bot_name):
    """
    Update bot config
    :param json:
    :return:
    """
    bot = Bot.objects.get(name=bot_name)

    return build_response.build_json(bot.config)

#Create Bot

@bots.route('/create', methods=['POST'])
def createBot():

    print("In create Bot")
    content = request.get_json(silent=True)
    print(content)
    bot = Bot()
    bot.botName = content.get("botName")
    bot.botDescription = content.get("botDescription")
    bot.userId = content.get("userId")
   # bot.userId=session.__getattribute__("userid")
   # print("userID",bot.userId)
    print("Bot Name", bot.botName)
    print("Bot Desc", bot.botDescription)
    print("User ID", bot.userId)

    try:
        bot.save()

    except Exception as e:
        print({"error", str(e)})
        res = {"response": "Error in  Bot creation", "statusCode" : "403"}
        return json.dumps(res)
    res = {"response": "Bot Created Successfully", "statusCode" : "200"}
    return json.dumps(res)



@bots.route('/list', methods=['POST'])
def getBots():
    data = request.get_json(silent = True)
    print(data)
    userId = data.get("userId")
    print(userId)
    bots = Bot.objects(userId=ObjectId(userId))
    #print(bots.botName)

#    print(bots.userId)
    return build_response.sent_json(bots.to_json())


@bots.route('/getBot/<id>')
def read_bot(id):
    """
    Find details for the given intent id
    :param id:
    :return:
    """
    print(id)
    return Response(response=dumps(
        Bot.objects.get(botId=ObjectId(id)).to_mongo().to_dict()),
        status=200,
        mimetype="application/json")