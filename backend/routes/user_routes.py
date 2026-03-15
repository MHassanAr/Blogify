# routes/user_routes.py
from fastapi import APIRouter, HTTPException
from models import UserSignup, UserLogin, UserResponce
from database import users_collection
import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# User Signup
@router.post("/signup")
def signup(user: UserSignup):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user_data = {
        "userName": user.userName,
        "email": user.email,
        "password": user.password  # optional: hash here
    }

    result = users_collection.insert_one(user_data)

    payload = {
        "email": user.email,
        "role": "user",
        "exp": datetime.utcnow() + timedelta(minutes=int(os.getenv("JWT_EXPIRE_MINUTES", 60)))
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "user": {
            "id": str(result.inserted_id),
            "userName": user.userName,
            "email": user.email
        },
        "access_token": token,
        "role": "user"
    }

# User / Admin Login
@router.post("/login")
def login(user: UserLogin):

    # Check Admin User
    if user.email == ADMIN_EMAIL and user.password == ADMIN_PASSWORD:
        payload = {
            "email": user.email,
            "role": "admin",
            "exp": datetime.utcnow() + timedelta(minutes=int(os.getenv("JWT_EXPIRE_MINUTES", 60)))
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return {
            "user": {"email": user.email, "userName": "Admin"},
            "access_token": token,
            "role": "admin"
        }

    # Check Normal User
    db_user = users_collection.find_one({"email": user.email})

    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    payload = {
        "email": db_user["email"],
        "role": "user",
        "exp": datetime.utcnow() + timedelta(minutes=int(os.getenv("JWT_EXPIRE_MINUTES", 60)))
    }
    
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "user": {
            "id": str(db_user["_id"]),
            "userName": db_user["userName"],
            "email": db_user["email"]
        },
        "access_token": token,
        "role": "user"
    }