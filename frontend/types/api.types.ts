// ============================================
// API TYPES - Types pour les réponses et requêtes API
// ============================================

/**
 * Erreur API standard
 */
export interface ApiError {
  detail: string;
  status?: number;
}

/**
 * Réponse paginée générique
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
  has_more?: boolean;
}

/**
 * Paramètres de pagination
 */
export interface PaginationParams {
  skip?: number;
  limit?: number;
}

/**
 * Réponse API générique
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

/**
 * Configuration pour les requêtes API
 */
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

/**
 * Métadonnées de réponse
 */
export interface ResponseMetadata {
  timestamp: string;
  request_id?: string;
  duration_ms?: number;
}
