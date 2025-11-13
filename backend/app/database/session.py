from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
def get_db_with_rls(current_user_id: int):
    db = SessionLocal()
    try:
        # Set the user context for RLS using text() wrapper
        db.execute(text(f"SET LOCAL app.current_user_id = '{current_user_id}';"))
        yield db
    finally:
        db.close()