import os
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import Blueprint, request, Response
from flask import current_app as app
from app.commons import build_response
from app.intents.models import Intent, Parameter, ApiDetails
from app.commons.utils import update_document


intents = Blueprint('intents_blueprint', __name__,
                    url_prefix='/intents')


@intents.route('/', methods=['POST'])
def create_intent():
    """
    Create a story from the provided json
    :param json:
    :return:
    """
    content = request.get_json(silent=True)

    intent = Intent()
    intent.name = content.get("name")
    intent.intentId = content.get("intentId")
    intent.speechResponse = content.get("speechResponse")
    intent.trainingData = []
    intent.botId = content.get("botId")

    if content.get("apiTrigger") is True:
        intent.apiTrigger = True
        api_details = ApiDetails()
        isJson = content.get("apiDetails").get("isJson")
        api_details.isJson = isJson
        if isJson:
            api_details.jsonData = content.get("apiDetails").get("jsonData")

        api_details.url = content.get("apiDetails").get("url")
        api_details.headers = content.get("apiDetails").get("headers")
        api_details.requestType = content.get("apiDetails").get("requestType")
        intent.apiDetails = api_details
    else:
        intent.apiTrigger = False

    if content.get("parameters"):
        for param in content.get("parameters"):
            parameter = Parameter()
            update_document(parameter, param)
            intent.parameters.append(parameter)
    try:
        story_id = intent.save()
    except Exception as e:
        return build_response.build_json({"error": str(e)})

    return build_response.build_json({
        "_id": str(story_id.id)
    })


@intents.route('/get',methods=['POST'])
def read_intents():
    """
    find list of intents for the agent
    :return:
    """
    data = request.get_json(silent = True)
    print(data)
    botId = data.get("botId")
    intents = Intent.objects(botId = botId)
   # intents = Intent.objects()
    return build_response.sent_json(intents.to_json())


@intents.route('/<id>')
def read_intent(id):
    """
    Find details for the given intent id
    :param id:
    :return:
    """
    return Response(response=dumps(
        Intent.objects.get(
            id=ObjectId(
                id)).to_mongo().to_dict()),
        status=200,
        mimetype="application/json")


@intents.route('/<id>', methods=['PUT'])
def update_intent(id):
    """
    Update a story from the provided json
    :param intent_id:
    :param json:
    :return:
    """
    json_data = loads(request.get_data())
    print(json_data)
    intent = Intent.objects.get(id=ObjectId(id))
    intent = update_document(intent, json_data)
    intent.save()
    return 'success', 200


from app.nlu.tasks import train_models


@intents.route('/<id>', methods=['DELETE'])
def delete_intent(id):
    """
    Delete a intent
    :param id:
    :return:
    """
    Intent.objects.get(id=ObjectId(id)).delete()

    try:
        train_models()
    except BaseException:
        pass

    # remove NER model for the deleted stoy
    try:
        os.remove("{}/{}.model".format(app.config["MODELS_DIR"], id))
    except OSError:
        pass
    return build_response.sent_ok()


from flask import send_file
from io import StringIO as StringIo


@intents.route('/export', methods=['GET'])
def export_intents():
    """
    Deserialize and export Mongoengines as jsonfile
    :return:
    """
    strIO = StringIO.StringIO()
    strIO.write(Intent.objects.to_json())
    strIO.seek(0)
    return send_file(strIO,
                     attachment_filename="iky_intents.json",
                     as_attachment=True)


from flask import abort
from bson.json_util import loads

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower()


@intents.route('/import/<botId>', methods=['POST'])
def import_intents(botId):
    """
    Convert json files to Intents objects and insert to MongoDB
    :return:
    """
    # check if the post request has the file part
    botId = botId
    if 'file' not in request.files:
        abort(400, 'No file part')
    json_file = request.files['file']
    if(allowed_file(json_file.filename)) == "json":
     intents = import_json(json_file, botId)
    else:
     intents = import_csv(json_file, botId)


    return build_response.build_json("intents_created")


def import_json(json_file,botId):
    print("in json_file")
    json_data = json_file.read()
    print(json_data)
    # intents = Intent.objects.from_json(json_data)
    import json
    intents = json.loads(json_data)

    creates_intents = []
    for intent in intents:
        new_intent = Intent()
        new_intent = update_document(new_intent, intent)
        new_intent.save()
        creates_intents.append(new_intent)
    return creates_intents
import csv
UPLOAD_FOLDER = './UploadFiles'
def import_csv(json_file, botId):
    file = json_file
    #filename = json_file.filename
    print("File Name", file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    print("File saved to folder")
    # return redirect(url_for('stories_blueprint.fileupload', filename=filename))
    csvfile = open(UPLOAD_FOLDER + '/' + file.filename, 'r', encoding='utf-8', errors='ignore')
    reader = csv.DictReader(csvfile)
    # print(reader)
    header = ["Question", "Answer"]
    for each in reader:
        row = {}
        for field in header:
            row[field] = each[field]
            trainingData=[]
            trainingData.append({'text' : row['Question'], 'entities' : " "})
        csvStories = Intent(name=row['Question'], intentId='fileUpload', userDefined='true',apiTrigger=False,speechResponse=row['Answer'],  trainingData = trainingData, botId = botId);

        csvStories.save();

