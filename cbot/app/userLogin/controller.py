import base64
from flask import Blueprint, request, make_response
from requests import session
from app.userLogin.models import *
import app.commons.build_response as build_response
from app.agents.models import Bot
import json




user = Blueprint('user_blueprint', __name__,
                    url_prefix='/user',
                    template_folder='templates')

@user.route('/login', methods=['POST'])
def login():
    print("Inside stories login")
    requestJson = request.get_json(silent=True)
    resultJson = requestJson
    print("Test.....", requestJson)
   # userName=resultJson['username']
    #passWord=resultJson['password']
    userName=base64.b64decode(resultJson["username"]).decode("utf-8")
    passWord=base64.b64decode(resultJson["password"]).decode("utf-8")
    print("Username ",userName)
    print("Password",passWord)
    #res={"result":" " }
    try:
        print(User.objects)
        user = User.objects.get(userName=userName)
        session.__setattr__('userid', str(user.id))
        session.__setattr__('username',user.userName)
        session.__setattr__('role',user.role)
        #User.objects.get(userName=userName)
        print(user)
    except:
        res={"response":" invaliduser", "statusCode" : "401"}
        return json.dumps(res)
    try:
        User.objects.get(passWord=passWord)
    except:
        res = {"response":"Invalid Password Please verify your login details.", "statusCode" : "401"}
        return json.dumps(res)
    print("User Id", user.id)
    userId = user.id
    username = user.userName
    role = user.role

    res = make_response("Setting a cookie")
    res.set_cookie('role', user.role, max_age=60 * 60 * 24 * 365 * 2)

    #print(type(userId.toHexString()))
    #print(type(userId))
    res = {"response": "Valid User","userId": str(userId), "statusCode" : "200","username" : str(username),"role" : str(role)}
    print(res)
    return json.dumps(res)



