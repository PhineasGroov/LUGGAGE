// ============================================
// TRAVEL TYPES - Générés depuis backend/app/models/travel.py
// ============================================

import { User } from './user.types';

/**
 * Données de base d'un voyage
 */
export interface TravelBase {
  origin: string;          // Ville/Pays de départ (ex: "Paris, France")
  destination: string;     // Ville/Pays d'arrivée (ex: "Dakar, Sénégal")
  travel_date: string;     // Date au format ISO 8601: "YYYY-MM-DD"
  capacity_kg: number;     // Capacité en kilogrammes (1-100)
}

/**
 * Données pour créer un voyage
 */
export interface TravelCreate extends TravelBase {}

/**
 * Voyage complet (retourné par l'API)
 */
export interface Travel extends TravelBase {
  id: number;
  traveler_id: number;
  traveler: User;
  packages?: Array<{
    id: number;
    description: string;
    weight_kg: number;
    dimensions: string;
    status: string;
    sender: User;
  }>;
}

/**
 * Filtres pour rechercher des voyages
 */
export interface TravelFilters {
  origin?: string;
  destination?: string;
  travel_date?: string;
  min_capacity?: number;
  date_from?: string;
  date_to?: string;
}

/**
 * Alias pour compatibilité avec ancien code
 */
export interface CreateTravelData extends TravelCreate {}

