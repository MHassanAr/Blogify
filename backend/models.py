from pydantic import BaseModel

class BlogPost(BaseModel):
    title: str
    description: str
    imageUrl: str
    