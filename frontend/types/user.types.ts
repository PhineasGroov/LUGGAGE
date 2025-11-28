// ============================================
// USER TYPES - Générés depuis backend/app/models/user.py
// ============================================

/**
 * Données de base d'un utilisateur
 */
export interface UserBase {
  email: string;
}

/**
 * Données pour créer un nouvel utilisateur (inscription)
 */
export interface UserCreate extends UserBase {
  password: string;
}

/**
 * Données pour se connecter
 */
export interface UserLogin {
  email: string;
  password: string;
}

/**
 * Utilisateur complet (retourné par l'API)
 */
export interface User extends UserBase {
  id: number;
  is_active: boolean;
}

/**
 * Profil utilisateur (alias pour compatibilité)
 */
export interface UserProfile extends User {
  created_at?: string;
}

/**
 * Données pour mettre à jour le profil
 */
export interface UpdateProfileData {
  email?: string;
  password?: string;
}
