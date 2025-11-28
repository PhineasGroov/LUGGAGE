// ============================================
// PACKAGE TYPES - Générés depuis backend/app/models/package.py
// ============================================

import { User } from './user.types';
import { Travel } from './travel.types';

/**
 * Statuts possibles d'un colis
 */
export enum PackageStatus {
  PENDING = 'pending',        // En attente d'acceptation
  ACCEPTED = 'accepted',      // Accepté par un voyageur
  IN_TRANSIT = 'in_transit',  // En cours de transport
  DELIVERED = 'delivered',    // Livré
  CANCELLED = 'cancelled',    // Annulé
}

/**
 * Données de base d'un colis
 */
export interface PackageBase {
  description: string;   // Description détaillée (min 10 caractères)
  weight_kg: number;     // Poids en kilogrammes (0.1-30)
  dimensions: string;    // Format: "LxWxH" (ex: "30x20x15" en cm)
  destination?: string;  // Destination du colis (utilisé par LocationInput)
}

/**
 * Données pour créer un colis
 */
export interface PackageCreate extends PackageBase {}

/**
 * Données pour mettre à jour un colis
 */
export interface PackageUpdate {
  description?: string;
  weight_kg?: number;
  dimensions?: string;
  status?: PackageStatus;
  travel_id?: number;
}

/**
 * Colis complet (retourné par l'API)
 */
export interface Package extends PackageBase {
  id: number;
  sender_id: number;
  travel_id: number | null;
  status: PackageStatus;
  destination?: string;  // Destination du colis
  created_at?: string;   // Date de création
  sender: User;
  travel: Travel | null;
}

/**
 * Filtres pour rechercher des colis
 */
export interface PackageFilters {
  status?: PackageStatus;
  sender_id?: number;
  travel_id?: number;
  min_weight?: number;
  max_weight?: number;
}

/**
 * Alias pour compatibilité avec ancien code
 */
export interface CreatePackageData extends PackageCreate {
  title?: string;  // Optionnel, peut être dérivé de description
}

