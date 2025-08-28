from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.schemas import user as user_schema
from app.models import user as user_model
from app.core.config import settings
from app.routers.auth import get_db # Réutilisation de la dépendance get_db

router = APIRouter()

# Ce schéma indique à FastAPI où trouver le token (dans le header Authorization)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Décode le token JWT pour obtenir l'utilisateur actuel.
    C'est une dépendance qui peut être utilisée par n'importe quel endpoint sécurisé.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=user_schema.User)
def read_users_me(current_user: user_model.User = Depends(get_current_user)):
    """
    Endpoint pour récupérer les informations de l'utilisateur connecté.
    """
    return current_user