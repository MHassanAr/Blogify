from fastapi import APIRouter
from database import collection
from models import BlogPost
from datetime import datetime, timezone
from bson import ObjectId

router = APIRouter()

# Create Post API
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

# Get all Posts
@router.get("/posts")
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
@router.put("/posts/{post_id}")
def update_post(post_id: str, post: BlogPost):

    update_post = {
        "title": post.title,
        "description": post.description,
        "imageUrl": post.imageUrl
    }

    collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": update_post}
    )

    return {"message": "Post updated!"}

# Delete Post
@router.delete("/posts/{post_id}")
def delete_post(post_id: str):

    result = collection.delete_one({"_id": ObjectId(post_id)})

    if result.deleted_count == 1:
        return {"message": "Blog deleted"}
        
    return {"message": "Blog not found"}