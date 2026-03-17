from pydantic import BaseModel, EmailStr

class BlogPost(BaseModel):
    title: str
    description: str
    imageUrl: str

class BlogPostResponse(BaseModel):
    id: str
    title: str
    description: str
    imageUrl: str

class UserSignup(BaseModel):
    userName: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponce(BaseModel):
    id: str
    userName: str
    email: EmailStr