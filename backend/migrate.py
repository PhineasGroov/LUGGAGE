"""
Database migration script.
This runs with admin credentials to create/update schema.
The application runtime user (luggage_app) will NOT have DDL privileges.
"""
import os
from sqlalchemy import create_engine
from app.database.base import Base
from app.models import user, travel, package  # Import all models
from app.database.rls_setup import enable_rls

def run_migrations():
    """Run database migrations with admin credentials"""
    
    # Use admin credentials for migrations
    admin_db_url = os.getenv(
        "ADMIN_DATABASE_URL",
        "postgresql://postgres:postgres_admin_pass@db:5432/luggage_db"
    )
    
    print(f"🔧 Connecting to database as admin...")
    admin_engine = create_engine(admin_db_url, pool_pre_ping=True)
    
    try:
        print("📦 Creating/updating database schema...")
        Base.metadata.create_all(bind=admin_engine)
        print("✓ Schema created successfully")
        
        print("🔒 Setting up Row Level Security...")
        # Temporarily use admin engine for RLS setup
        from app.database import rls_setup
        original_engine = rls_setup.engine
        rls_setup.engine = admin_engine
        
        enable_rls()
        print("✓ RLS policies applied successfully")
        
        # Grant privileges to runtime user
        print("🔑 Granting privileges to runtime user...")
        with admin_engine.connect() as conn:
            conn.execute(text("""
                -- Grant table privileges to luggage_app
                GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO luggage_app;
                
                -- Grant sequence privileges
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO luggage_app;
                
                -- Grant usage on custom types
                GRANT USAGE ON TYPE packagestatus TO luggage_app;
            """))
            conn.commit()
        print("✓ Privileges granted successfully")
        
        # Restore original engine
        rls_setup.engine = original_engine
        
        print("\n✅ Migration completed successfully!")
        return True
        
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        admin_engine.dispose()

if __name__ == "__main__":
    from sqlalchemy import text
    success = run_migrations()
    exit(0 if success else 1)
