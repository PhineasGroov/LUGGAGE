from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

# Propriétés communes partagées par tous les schémas
class UserBase(BaseModel):
    email: EmailStr

# Propriétés à recevoir lors de la création d'un utilisateur
class UserCreate(UserBase):
    password: str
    current_role: UserRole = UserRole.SENDER  # Changé de 'role' à 'current_role'

# Propriétés à renvoyer au client (sans le mot de passe)
class User(UserBase):
    id: int
    is_active: bool
    current_role: UserRole  # Changé de 'role' à 'current_role'

    class Config:
        from_attributes = True # Permet de mapper le modèle SQLAlchemy au schéma Pydantic