from fastapi import FastAPI
from app.database.base import Base
from app.database.session import engine

# Import your models here to ensure they are registered with SQLAlchemy
from app.models.user import User 

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LUGGAGE Project",
    description="API for connecting travelers and senders.",
    version="0.0.1",
)

@app.get("/")
async def read_root():
    """
    Root endpoint to welcome users.
    """
    return {"message": "Welcome to the LUGGAGE API"}

# According to the roadmap, you will later include routers from your modules here.
# from .routers import auth, user, package, travel
#
# app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# app.include_router(user.router, prefix="/users", tags=["Users"])
# app.include_router(package.router, prefix="/packages", tags=["Packages"])
# app.include_router(travel.router, prefix="/travels", tags=["Travels"])