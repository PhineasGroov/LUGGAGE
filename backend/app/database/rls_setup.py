from sqlalchemy import text
from app.database.session import engine

def enable_rls():
    """Enable Row Level Security on tables.
    This is called by migrate.py with admin credentials.
    Note: No FORCE needed since luggage_app doesn't own tables.
    """
    with engine.connect() as conn:
        # Enable RLS on travels table
        conn.execute(text("""
            ALTER TABLE travels ENABLE ROW LEVEL SECURITY;
        """))
        
        # Policy: Allow everyone to view all travels (for browsing)
        conn.execute(text("""
            DROP POLICY IF EXISTS travels_select_policy ON travels;
            CREATE POLICY travels_select_policy ON travels
            FOR SELECT
            USING (true);
        """))
        
        # Policy: Travelers can only insert their own travels
        conn.execute(text("""
            DROP POLICY IF EXISTS travels_insert_policy ON travels;
            CREATE POLICY travels_insert_policy ON travels
            FOR INSERT
            WITH CHECK (traveler_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Policy: Travelers can only update their own travels
        conn.execute(text("""
            DROP POLICY IF EXISTS travels_update_policy ON travels;
            CREATE POLICY travels_update_policy ON travels
            FOR UPDATE
            USING (traveler_id = current_setting('app.current_user_id', true)::integer)
            WITH CHECK (traveler_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Policy: Travelers can only delete their own travels
        conn.execute(text("""
            DROP POLICY IF EXISTS travels_delete_policy ON travels;
            CREATE POLICY travels_delete_policy ON travels
            FOR DELETE
            USING (traveler_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Enable RLS on packages table
        conn.execute(text("""
            ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
        """))
        
        # Policy: Allow everyone to view packages (for browsing)
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_select_policy ON packages;
            CREATE POLICY packages_select_policy ON packages
            FOR SELECT
            USING (true);
        """))
        
        # Policy: Senders can only insert their own packages
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_insert_policy ON packages;
            CREATE POLICY packages_insert_policy ON packages
            FOR INSERT
            WITH CHECK (sender_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Policy: Senders can only update their own packages
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_update_policy ON packages;
            CREATE POLICY packages_update_policy ON packages
            FOR UPDATE
            USING (sender_id = current_setting('app.current_user_id', true)::integer)
            WITH CHECK (sender_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Policy: Senders can only delete their own packages
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_delete_policy ON packages;
            CREATE POLICY packages_delete_policy ON packages
            FOR DELETE
            USING (sender_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        conn.commit()

def disable_rls():
    """Disable Row Level Security (for testing or rollback)"""
    with engine.connect() as conn:
        # Drop travel policies
        conn.execute(text("DROP POLICY IF EXISTS travels_select_policy ON travels;"))
        conn.execute(text("DROP POLICY IF EXISTS travels_insert_policy ON travels;"))
        conn.execute(text("DROP POLICY IF EXISTS travels_update_policy ON travels;"))
        conn.execute(text("DROP POLICY IF EXISTS travels_delete_policy ON travels;"))
        conn.execute(text("ALTER TABLE travels DISABLE ROW LEVEL SECURITY;"))
        
        # Drop package policies
        conn.execute(text("DROP POLICY IF EXISTS packages_select_policy ON packages;"))
        conn.execute(text("DROP POLICY IF EXISTS packages_insert_policy ON packages;"))
        conn.execute(text("DROP POLICY IF EXISTS packages_update_policy ON packages;"))
        conn.execute(text("DROP POLICY IF EXISTS packages_delete_policy ON packages;"))
        conn.execute(text("ALTER TABLE packages DISABLE ROW LEVEL SECURITY;"))
        
        conn.commit()