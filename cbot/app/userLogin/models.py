from bson.objectid import ObjectId
from mongoengine.fields import ListField,\
    EmbeddedDocumentListField, EmbeddedDocumentField, EmbeddedDocument,\
    ObjectIdField, StringField,\
    BooleanField, Document

class User(Document):
    userId=ObjectIdField(required=True, default=lambda: ObjectId())
    userName=StringField(max_length=100,required=True,unique=True)
    passWord=StringField(max_length=100,required=True)
    role = StringField(max_length= 100)


'''class Bot(Document):
    botId=ObjectIdField(required=True, default=lambda: ObjectId())
    botName=StringField(max_length=100,required=True)
    botDescription=StringField(max_length=1000,required=True)
    userId =ObjectIdField(required=True, default=lambda: ObjectId())
    channelId=ObjectIdField(required=True, default=lambda: ObjectId())'''

#bot1=Bot(botName='SampleBot',botDescription="This is sample bot")
#bot1.save()

#user1=User(userName='Admin',passWord="Admin123$",role="Admin")
#user1.save()
