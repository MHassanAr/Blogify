from fastapi import APIRouter
from database import collection
from models import BlogPost
from datetime import datetime, timezone

router = APIRouter()

#Create Post API
@router.post("/posts")
def create_post(post: BlogPost):
    blog = {
        "title": post.title,
        "description": post.description,
        "imageUrl": post.imageUrl,
        "created_at": datetime.now(timezone.utc)
    }

    result = collection.insert_one(blog)

    return {
        "id": str(result.inserted_id),
        "title": blog["title"],
        "description": blog["description"],
        "imageUrl": blog["imageUrl"]
        }

#Get all Posts
@router.get("/posts")
def get_posts():

    posts = []
    for post in collection.find().sort("created_at", -1):
        posts.append({
            "id": str(post["_id"]),
            "title": post["title"],
            "description": post["description"],
            "imageUrl": post["imageUrl"]
        })
    
    return posts