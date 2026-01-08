from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

def get_user_infos_from_google_token(id_token_str):
    # Verify the token and get user info
    id_info = id_token.verify_oauth2_token(
        id_token_str, 
        google_requests.Request(), 
        OIDC_GOOGLE_CLIENT_ID  # Your Google Client ID from env variables
    )

    user_infos = {
        'id': id_info['sub'],  # Google's unique identifier for the user
        'email': id_info.get('email'),
        'name': id_info.get('name')
    }

    if not user_infos:
        return {
            "status": False,
            "user_infos": user_infos
        }

    return {
        "status": True,
        "user_infos": user_infos
    }