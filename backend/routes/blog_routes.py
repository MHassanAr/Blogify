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
        "message": "Post created successfully",
        "id": str(result.inserted_id)
    }

#Get all Posts
@router.get("/posts")
def get_posts():

    posts = []
    for post in collection.find():
        posts.append({
            "id": str(post["_id"]),
            "title": post["title"],
            "description": post["description"],
            "imageUrl": post["imageUrl"]
        })
    
    return posts