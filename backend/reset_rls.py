#!/usr/bin/env python3
"""
Script to reset RLS policies.
Run this to disable old policies and enable new ones.
"""
from app.database.rls_setup import disable_rls, enable_rls

if __name__ == "__main__":
    print("🔄 Disabling old RLS policies...")
    try:
        disable_rls()
        print("✓ Old policies disabled")
    except Exception as e:
        print(f"⚠ Warning disabling old policies: {e}")
    
    print("\n🔒 Enabling new RLS policies...")
    try:
        enable_rls()
        print("✓ New RLS policies enabled successfully!")
        print("\nRLS is now active with separate policies for:")
        print("  - SELECT (all users can browse)")
        print("  - INSERT (only owner)")
        print("  - UPDATE (only owner)")
        print("  - DELETE (only owner)")
    except Exception as e:
        print(f"❌ Error enabling RLS: {e}")
        raise
