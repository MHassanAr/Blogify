from fastapi import APIRouter
from database import collection
from models import BlogPost
from datetime import datetime, timezone
from bson import ObjectId
from models import BlogPostResponse
from typing import List
from auth.auth_handler import verify_admin
from fastapi import Depends

router = APIRouter()

# Create Post API
@router.post("/posts", response_model=BlogPostResponse)
def create_post(post: BlogPost, admin=Depends(verify_admin)):

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

# Get all Posts
@router.get("/posts", response_model=List[BlogPostResponse])
def get_posts(limit: int | None = None):

    posts = []
    query = collection.find().sort("created_at", -1)

    if limit:
        query = query.limit(limit)

    for post in query:
        posts.append({
            "id": str(post["_id"]),
            "title": post["title"],
            "description": post["description"],
            "imageUrl": post["imageUrl"]
        })
    
    return posts

# Update Post
@router.put("/posts/{post_id}", response_model=BlogPostResponse)
def update_post(post_id: str, post: BlogPost, admin=Depends(verify_admin)):
    update_post = {
        "title": post.title,
        "description": post.description,
        "imageUrl": post.imageUrl
    }

    collection.update_one({"_id": ObjectId(post_id)}, {"$set": update_post})
    updated_blog = collection.find_one({"_id": ObjectId(post_id)})

    return {
        "id": str(updated_blog["_id"]),
        "title": updated_blog["title"],
        "description": updated_blog["description"],
        "imageUrl": updated_blog["imageUrl"]
    }

# Delete Post
@router.delete("/posts/{post_id}")
def delete_post(post_id: str, admin=Depends(verify_admin)):

    result = collection.delete_one({"_id": ObjectId(post_id)})

    if result.deleted_count == 1:
        return {"message": "Blog deleted"}
        
    return {"message": "Blog not found"}