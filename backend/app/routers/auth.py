from fastapi import APIRouter, Depends, HTTPException, status, Request, Form
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer, OAuth2AuthorizationCodeBearer
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from datetime import timedelta
from jose import JWTError, jwt
import httpx
from typing import Optional
from app.schemas import user as user_schema
from app.models import user as user_model
from app.database.session import SessionLocal
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.token import Token
from app.core.config import settings
from app.database.session import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Google OAuth2 configuration
GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = settings.GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI = "http://localhost:8001/docs/oauth2-redirect"  # Swagger's OAuth redirect
GOOGLE_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

router = APIRouter()

@router.post("/register", response_model=user_schema.User)
def register_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = user_model.User(
        email=user.email, 
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=user_schema.User)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/google/login")
async def google_login(request: Request):
    """Redirect to Google OAuth2 login page - Click Authorize in Swagger GoogleOAuth section to trigger this"""
    # Get query parameters from Swagger OAuth flow
    redirect_uri = request.query_params.get('redirect_uri', GOOGLE_REDIRECT_URI)
    state = request.query_params.get('state', '')
    code_challenge = request.query_params.get('code_challenge', '')
    code_challenge_method = request.query_params.get('code_challenge_method', '')
    
    print(f"DEBUG /google/login: redirect_uri={redirect_uri}, code_challenge={code_challenge[:20] if code_challenge else None}...")
    
    google_auth_url = (
        f"{GOOGLE_AUTHORIZE_URL}?"
        f"client_id={GOOGLE_CLIENT_ID}&"
        f"redirect_uri={redirect_uri}&"
        f"response_type=code&"
        f"scope=openid email profile&"
        f"access_type=offline"
    )
    
    # Add state parameter if provided (for Swagger CSRF protection)
    if state:
        google_auth_url += f"&state={state}"
    
    # Add PKCE parameters if provided by Swagger
    if code_challenge and code_challenge_method:
        google_auth_url += f"&code_challenge={code_challenge}&code_challenge_method={code_challenge_method}"
    
    print(f"DEBUG: Redirecting to Google with PKCE: {bool(code_challenge)}")
    return RedirectResponse(url=google_auth_url)

@router.post("/google/callback", response_model=Token)
async def google_callback_post(
    request: Request,
    db: Session = Depends(get_db)
):
    """Handle Swagger OAuth2 POST callback - accepts form data"""
    # Get form data from request
    try:
        form_data = await request.form()
        code = form_data.get("code")
        redirect_uri = form_data.get("redirect_uri")
        code_verifier = form_data.get("code_verifier")
        
        print(f"DEBUG: Received form data: code={code[:20] if code else None}..., redirect_uri={redirect_uri}, code_verifier={code_verifier[:20] if code_verifier else None}...")
        
        if not code:
            raise HTTPException(status_code=400, detail="Authorization code not provided in form data")
        
        # Use the redirect_uri that was used in the authorization request
        actual_redirect_uri = redirect_uri or GOOGLE_REDIRECT_URI
        
        # Exchange authorization code for access token from Google
        async with httpx.AsyncClient() as client:
            token_data = {
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": actual_redirect_uri,
                "grant_type": "authorization_code",
            }
            
            # Add PKCE code_verifier if provided by Swagger
            if code_verifier:
                token_data["code_verifier"] = code_verifier
            
            print(f"DEBUG: Sending token request to Google...")
            token_response = await client.post(GOOGLE_TOKEN_URL, data=token_data)
        
        if token_response.status_code != 200:
            print(f"DEBUG: Google token error: {token_response.text}")
            raise HTTPException(
                status_code=400, 
                detail=f"Failed to obtain access token from Google: {token_response.text}"
            )
        
        token_data = token_response.json()
        access_token_google = token_data.get("access_token")
        print(f"DEBUG: Got access token from Google")
        
        # Get user info from Google
        async with httpx.AsyncClient() as client:
            userinfo_response = await client.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {access_token_google}"},
            )
        
        if userinfo_response.status_code != 200:
            print(f"DEBUG: Google userinfo error: {userinfo_response.text}")
            raise HTTPException(status_code=400, detail="Failed to get user info from Google")
        
        user_info = userinfo_response.json()
        email = user_info.get("email")
        print(f"DEBUG: Got user info, email: {email}")
        
        if not email:
            raise HTTPException(status_code=400, detail="Email not provided by Google")
        
        # Check if user exists, create if not
        user = db.query(user_model.User).filter(user_model.User.email == email).first()
        if not user:
            print(f"DEBUG: Creating new user for {email}")
            # Create new user
            user = user_model.User(
                email=email,
                hashed_password=get_password_hash("google_oauth_user"),
                is_active=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            print(f"DEBUG: User {email} already exists")
        
        # Generate JWT token for our application
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        print(f"DEBUG: Generated JWT token for {email}")
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"DEBUG: Exception in callback: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Error processing OAuth callback: {str(e)}")

@router.get("/google/callback", response_model=Token)
async def google_callback_get(code: str = None, state: str = None, redirect_uri: str = None, db: Session = Depends(get_db)):
    """Handle Google OAuth2 GET callback (for manual browser flow)"""
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code not provided")
    
    # Use the redirect_uri that was used in the authorization request
    actual_redirect_uri = redirect_uri or GOOGLE_REDIRECT_URI
    
    # Exchange authorization code for access token
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": actual_redirect_uri,
                "grant_type": "authorization_code",
            },
        )
    
    if token_response.status_code != 200:
        raise HTTPException(status_code=400, detail=f"Failed to obtain access token: {token_response.text}")
    
    token_data = token_response.json()
    access_token_google = token_data.get("access_token")
    
    # Get user info from Google
    async with httpx.AsyncClient() as client:
        userinfo_response = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token_google}"},
        )
    
    if userinfo_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get user info")
    
    user_info = userinfo_response.json()
    email = user_info.get("email")
    
    if not email:
        raise HTTPException(status_code=400, detail="Email not provided by Google")
    
    # Check if user exists, create if not
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if not user:
        # Create new user
        user = user_model.User(
            email=email,
            hashed_password=get_password_hash("google_oauth_user"),  # Placeholder password
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Generate JWT token for our application
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # Return token in the format Swagger expects
    # Note: Swagger OAuth flow validates the state parameter automatically
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }