from pymongo import MongoClient
import json

MONGO_URI = "mongodb+srv://hrithikbcd23:Retardestshit12@cluster0.ezqmokg.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI)
db = client["testimpact"]

def insertcollection(input, output):
    collection = db["prompts"]
    data = {"input": str(input), "output": str(output)}
    collection.insert_one(data)
    print(data)

def getdata():
    collection = db["prompts"]
    data = collection.find()
    
    result = []
    for doc in data:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        result.append(doc)
    
    return json.dumps(result)




