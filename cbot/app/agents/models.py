from mongoengine.fields import StringField , Document,DictField
from bson.objectid import ObjectId
from mongoengine import *

class Bot(Document):
    botId=ObjectIdField(required=True, default=lambda: ObjectId())
    botName=StringField(unique=True,max_length=100,required=True)
    botDescription=StringField(max_length=1000,required=True)
    userId =ObjectIdField(required=True, default=lambda: ObjectId())
    channelId=ObjectIdField(required=True, default=lambda: ObjectId())