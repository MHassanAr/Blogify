from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.blog_routes import router as blog_router
from routes.user_routes import router as user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(blog_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Blog API Running"}