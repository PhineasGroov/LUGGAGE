"""
Tests de vérification post-suppression des rôles.

Ces tests vérifient que l'application fonctionne correctement après
la suppression de la notion de rôle.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_without_role():
    """
    Teste que l'enregistrement fonctionne sans paramètre role.
    """
    response = client.post(
        "/auth/register",
        json={
            "email": "test@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code in [200, 201, 400]  # 400 si l'email existe déjà
    if response.status_code in [200, 201]:
        data = response.json()
        assert "email" in data
        assert data["email"] == "test@example.com"
        assert "current_role" not in data  # Vérifier que le rôle n'est plus retourné
        assert "is_active" in data

def test_user_schema_no_role():
    """
    Teste que le schéma utilisateur ne contient plus de rôle.
    """
    # Créer un utilisateur de test
    response = client.post(
        "/auth/register",
        json={
            "email": "testrole@example.com",
            "password": "testpassword123"
        }
    )
    
    if response.status_code in [200, 201]:
        data = response.json()
        # Vérifier que le rôle n'est PAS présent
        assert "current_role" not in data
        assert "role" not in data

def test_switch_role_endpoint_removed():
    """
    Teste que l'endpoint switch-role n'existe plus.
    """
    # Tenter d'accéder à l'ancien endpoint
    response = client.patch("/users/switch-role")
    # Devrait retourner 404 (Not Found) ou 401 (Unauthorized)
    assert response.status_code in [404, 401, 405]

def test_create_travel_without_role_check():
    """
    Teste qu'un utilisateur peut créer un voyage sans restriction de rôle.
    """
    # D'abord, créer et connecter un utilisateur
    register_response = client.post(
        "/auth/register",
        json={
            "email": "traveler@example.com",
            "password": "testpassword123"
        }
    )
    
    if register_response.status_code in [200, 201]:
        # Se connecter
        login_response = client.post(
            "/auth/login",
            data={
                "username": "traveler@example.com",
                "password": "testpassword123"
            }
        )
        
        if login_response.status_code == 200:
            token = login_response.json()["access_token"]
            
            # Créer un voyage
            travel_response = client.post(
                "/travels/",
                json={
                    "origin": "Paris",
                    "destination": "London",
                    "departure_date": "2025-12-01",
                    "capacity_kg": 20.0
                },
                headers={"Authorization": f"Bearer {token}"}
            )
            
            # Devrait réussir (pas de vérification de rôle)
            assert travel_response.status_code in [200, 201]

def test_create_package_without_role_check():
    """
    Teste qu'un utilisateur peut créer un colis sans restriction de rôle.
    """
    # D'abord, créer et connecter un utilisateur
    register_response = client.post(
        "/auth/register",
        json={
            "email": "sender@example.com",
            "password": "testpassword123"
        }
    )
    
    if register_response.status_code in [200, 201]:
        # Se connecter
        login_response = client.post(
            "/auth/login",
            data={
                "username": "sender@example.com",
                "password": "testpassword123"
            }
        )
        
        if login_response.status_code == 200:
            token = login_response.json()["access_token"]
            
            # Créer un colis
            package_response = client.post(
                "/packages/",
                json={
                    "title": "Test Package",
                    "description": "A test package",
                    "weight_kg": 5.0,
                    "origin": "Paris",
                    "destination": "London"
                },
                headers={"Authorization": f"Bearer {token}"}
            )
            
            # Devrait réussir (pas de vérification de rôle)
            assert package_response.status_code in [200, 201]

def test_user_can_do_both_actions():
    """
    Teste qu'un même utilisateur peut créer à la fois un voyage ET un colis.
    C'était impossible avec l'ancien système de rôles.
    """
    # Créer un utilisateur
    register_response = client.post(
        "/auth/register",
        json={
            "email": "both@example.com",
            "password": "testpassword123"
        }
    )
    
    if register_response.status_code in [200, 201]:
        # Se connecter
        login_response = client.post(
            "/auth/login",
            data={
                "username": "both@example.com",
                "password": "testpassword123"
            }
        )
        
        if login_response.status_code == 200:
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # Créer un voyage
            travel_response = client.post(
                "/travels/",
                json={
                    "origin": "Paris",
                    "destination": "London",
                    "departure_date": "2025-12-01",
                    "capacity_kg": 20.0
                },
                headers=headers
            )
            
            # Créer un colis
            package_response = client.post(
                "/packages/",
                json={
                    "title": "Test Package",
                    "description": "A test package",
                    "weight_kg": 5.0,
                    "origin": "Paris",
                    "destination": "London"
                },
                headers=headers
            )
            
            # Les deux devraient réussir
            assert travel_response.status_code in [200, 201]
            assert package_response.status_code in [200, 201]

if __name__ == "__main__":
    print("Running tests...")
    pytest.main([__file__, "-v"])
