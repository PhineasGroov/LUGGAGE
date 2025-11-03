from pydantic import BaseModel, EmailStr

# Propriétés communes partagées par tous les schémas
class UserBase(BaseModel):
    email: EmailStr

# Propriétés à recevoir lors de la création d'un utilisateur
class UserCreate(UserBase):
    password: str

# Propriétés à renvoyer au client (sans le mot de passe)
class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True # Permet de mapper le modèle SQLAlchemy au schéma Pydantic