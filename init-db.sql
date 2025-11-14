-- Create runtime user with MINIMAL privileges
-- This user can ONLY read/write data, NOT modify schema
CREATE USER luggage_app WITH PASSWORD 'luggage_app_pass';

-- Grant database connection
GRANT CONNECT ON DATABASE luggage_db TO luggage_app;

-- Grant schema usage (but NOT CREATE)
GRANT USAGE ON SCHEMA public TO luggage_app;

-- Note: Table privileges will be granted by migration script
-- This ensures luggage_app can never CREATE, ALTER, or DROP tables
