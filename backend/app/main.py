from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.base import Base
from app.database.session import engine

# Import your models here to ensure they are registered with SQLAlchemy
from app.models.user import User
from app.models.travel import Travel
from app.models.package import Package

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LUGGAGE Project",
    description="API for connecting travelers and senders.",
    version="0.0.1",
)

# ⭐ CONFIGURATION CORS - AJOUT IMPORTANT
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://0.0.0.0:5173"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    """
    Root endpoint to welcome users.
    """
    return {"message": "Welcome to the LUGGAGE API"}
    


# According to the roadmap, you will later include routers from your modules here.
from .routers import auth, users, travels, packages

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(packages.router, prefix="/packages", tags=["Packages"])
app.include_router(travels.router, prefix="/travels", tags=["Travels"])