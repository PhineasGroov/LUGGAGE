from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import OAuthFlows, OAuthFlowAuthorizationCode
from app.database.base import Base
from app.database.session import engine
from app.core.config import settings

# Import your models here to ensure they are registered with SQLAlchemy
from app.models.user import User
from app.models.travel import Travel
from app.models.package import Package

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LUGGAGE Project",
    description="API for connecting travelers and senders. You can authenticate using email/password OR click 'Authorize' in Google OAuth section (leave fields empty) to use Google login.",
    version="0.0.1",
    swagger_ui_init_oauth={
        "clientId": settings.GOOGLE_CLIENT_ID,
        "appName": "LUGGAGE API",
        "scopes": "openid email profile",
        "usePkceWithAuthorizationCodeGrant": True,
    }
)

# ⭐ CONFIGURATION CORS - AJOUT IMPORTANT
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://0.0.0.0:5173"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """
    Application startup.
    Note: Schema creation and RLS setup are now handled by migrate.py
    The app runs with minimal privileges and cannot modify schema.
    """
    print("✓ LUGGAGE API started successfully")
    print("Using runtime user (read/write only, no DDL privileges)")
    print(f"Google OAuth configured: {bool(settings.GOOGLE_CLIENT_ID)}")

@app.get("/")
async def read_root():
    """
    Root endpoint to welcome users.
    """
    return {"message": "Welcome to the LUGGAGE API"}
    


# According to the roadmap, you will later include routers from your modules here.
from .routers import auth, users, travels, packages, admin

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(packages.router, prefix="/packages", tags=["Packages"])
app.include_router(travels.router, prefix="/travels", tags=["Travels"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# Override OpenAPI schema to add Google OAuth security scheme
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    from fastapi.openapi.utils import get_openapi
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    
    # Add Google OAuth2 security scheme
    openapi_schema["components"]["securitySchemes"]["GoogleOAuth"] = {
        "type": "oauth2",
        "flows": {
            "authorizationCode": {
                "authorizationUrl": "http://localhost:8001/auth/google/login",
                "tokenUrl": "http://localhost:8001/auth/google/callback",
                "scopes": {
                    "openid": "OpenID Connect",
                    "email": "Access email",
                    "profile": "Access profile"
                }
            }
        }
    }
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi