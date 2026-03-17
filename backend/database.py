import os
from pymongo import MongoClient

MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME", "admin")
MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD", "admin123")
MONGO_PORT = "27017" 

MONGO_URL = f"mongodb://{MONGO_USER}:{MONGO_PASS}@mongo:{MONGO_PORT}/?authSource=admin"

client = MongoClient(MONGO_URL)

db = client["blog_db"]

collection = db["posts"]
users_collection = db["users"]  