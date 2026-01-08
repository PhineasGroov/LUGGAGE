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
        
        # Policy: Senders can update their own packages, OR travelers can update packages assigned to their travels
        # Note: Application layer ensures travelers only update status field
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_update_policy ON packages;
            CREATE POLICY packages_update_policy ON packages
            FOR UPDATE
            USING (
                sender_id = current_setting('app.current_user_id', true)::integer
                OR
                (travel_id IS NOT NULL AND EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = packages.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                ))
            );
        """))
        
        # Policy: Senders can only delete their own packages
        conn.execute(text("""
            DROP POLICY IF EXISTS packages_delete_policy ON packages;
            CREATE POLICY packages_delete_policy ON packages
            FOR DELETE
            USING (sender_id = current_setting('app.current_user_id', true)::integer);
        """))
        
        # Enable RLS on travel_documents table
        conn.execute(text("""
            ALTER TABLE travel_documents ENABLE ROW LEVEL SECURITY;
        """))
        
        # Policy: Travelers can view documents for their own travels, admins can view all
        conn.execute(text("""
            DROP POLICY IF EXISTS travel_documents_select_policy ON travel_documents;
            CREATE POLICY travel_documents_select_policy ON travel_documents
            FOR SELECT
            USING (
                EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = travel_documents.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                )
                OR
                EXISTS (
                    SELECT 1 FROM users 
                    WHERE users.id = current_setting('app.current_user_id', true)::integer 
                    AND users.is_admin = true
                )
            );
        """))
        
        # Policy: Travelers can only insert documents for their own travels
        conn.execute(text("""
            DROP POLICY IF EXISTS travel_documents_insert_policy ON travel_documents;
            CREATE POLICY travel_documents_insert_policy ON travel_documents
            FOR INSERT
            WITH CHECK (
                EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = travel_documents.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                )
            );
        """))
        
        # Policy: Only admins can update documents (for verification)
        conn.execute(text("""
            DROP POLICY IF EXISTS travel_documents_update_policy ON travel_documents;
            CREATE POLICY travel_documents_update_policy ON travel_documents
            FOR UPDATE
            USING (
                EXISTS (
                    SELECT 1 FROM users 
                    WHERE users.id = current_setting('app.current_user_id', true)::integer 
                    AND users.is_admin = true
                )
            );
        """))
        
        # Policy: Travelers can delete documents for their own travels (before verification)
        conn.execute(text("""
            DROP POLICY IF EXISTS travel_documents_delete_policy ON travel_documents;
            CREATE POLICY travel_documents_delete_policy ON travel_documents
            FOR DELETE
            USING (
                EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = travel_documents.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                )
            );
        """))
        
        # Enable RLS on package_requests table
        conn.execute(text("""
            ALTER TABLE package_requests ENABLE ROW LEVEL SECURITY;
        """))
        
        # Policy: Senders and travelers can view requests for their packages/travels
        conn.execute(text("""
            DROP POLICY IF EXISTS package_requests_select_policy ON package_requests;
            CREATE POLICY package_requests_select_policy ON package_requests
            FOR SELECT
            USING (
                EXISTS (
                    SELECT 1 FROM packages 
                    WHERE packages.id = package_requests.package_id 
                    AND packages.sender_id = current_setting('app.current_user_id', true)::integer
                )
                OR
                EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = package_requests.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                )
            );
        """))
        
        # Policy: Senders can insert requests for their packages
        conn.execute(text("""
            DROP POLICY IF EXISTS package_requests_insert_policy ON package_requests;
            CREATE POLICY package_requests_insert_policy ON package_requests
            FOR INSERT
            WITH CHECK (
                EXISTS (
                    SELECT 1 FROM packages 
                    WHERE packages.id = package_requests.package_id 
                    AND packages.sender_id = current_setting('app.current_user_id', true)::integer
                )
            );
        """))
        
        # Policy: Senders and travelers can update requests (sender cancels, traveler accepts/rejects)
        conn.execute(text("""
            DROP POLICY IF EXISTS package_requests_update_policy ON package_requests;
            CREATE POLICY package_requests_update_policy ON package_requests
            FOR UPDATE
            USING (
                EXISTS (
                    SELECT 1 FROM packages 
                    WHERE packages.id = package_requests.package_id 
                    AND packages.sender_id = current_setting('app.current_user_id', true)::integer
                )
                OR
                EXISTS (
                    SELECT 1 FROM travels 
                    WHERE travels.id = package_requests.travel_id 
                    AND travels.traveler_id = current_setting('app.current_user_id', true)::integer
                )
            );
        """))
        
        # Policy: Senders can delete their own requests
        conn.execute(text("""
            DROP POLICY IF EXISTS package_requests_delete_policy ON package_requests;
            CREATE POLICY package_requests_delete_policy ON package_requests
            FOR DELETE
            USING (
                EXISTS (
                    SELECT 1 FROM packages 
                    WHERE packages.id = package_requests.package_id 
                    AND packages.sender_id = current_setting('app.current_user_id', true)::integer
                )
            );
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
        
        # Drop travel_documents policies
        conn.execute(text("DROP POLICY IF EXISTS travel_documents_select_policy ON travel_documents;"))
        conn.execute(text("DROP POLICY IF EXISTS travel_documents_insert_policy ON travel_documents;"))
        conn.execute(text("DROP POLICY IF EXISTS travel_documents_update_policy ON travel_documents;"))
        conn.execute(text("DROP POLICY IF EXISTS travel_documents_delete_policy ON travel_documents;"))
        conn.execute(text("ALTER TABLE travel_documents DISABLE ROW LEVEL SECURITY;"))
        
        # Drop package_requests policies
        conn.execute(text("DROP POLICY IF EXISTS package_requests_select_policy ON package_requests;"))
        conn.execute(text("DROP POLICY IF EXISTS package_requests_insert_policy ON package_requests;"))
        conn.execute(text("DROP POLICY IF EXISTS package_requests_update_policy ON package_requests;"))
        conn.execute(text("DROP POLICY IF EXISTS package_requests_delete_policy ON package_requests;"))
        conn.execute(text("ALTER TABLE package_requests DISABLE ROW LEVEL SECURITY;"))
        
        conn.commit()