// ============================================
// AUTH TYPES - Générés depuis backend/app/schemas/token.py
// ============================================

import { User } from './user.types';

/**
 * Token JWT retourné lors de la connexion/inscription
 */
export interface Token {
  access_token: string;  // Token JWT
  token_type: string;    // "bearer"
}

/**
 * Données contenues dans le token décodé
 */
export interface TokenData {
  email: string | null;
  user_id?: number;
  exp?: number;  // Expiration timestamp
}

/**
 * Réponse de connexion
 */
export interface LoginResponse extends Token {
  user?: User;
}

/**
 * Credentials de connexion
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Données d'inscription
 */
export interface RegisterData {
  email: string;
  password: string;
}

/**
 * Contexte d'authentification (pour React Context)
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

