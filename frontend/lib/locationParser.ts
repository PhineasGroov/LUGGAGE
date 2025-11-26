/**
 * Parse une chaîne de localisation Nominatim et extrait les composants
 * Exemple: "Douala, Douala II, Communauté urbaine de Douala, Wouri, Région du Littoral, Cameroun"
 */

export interface ParsedLocation {
  full: string;          // Chaîne complète
  city?: string;         // Ville principale
  district?: string;     // Quartier/District
  region?: string;       // Région
  country?: string;      // Pays
  raw: string[];         // Tous les segments
}

/**
 * Parse une chaîne de localisation au format Nominatim
 */
export function parseLocation(locationString: string): ParsedLocation {
  if (!locationString) {
    return {
      full: '',
      raw: [],
    };
  }

  const parts = locationString.split(',').map(p => p.trim());
  
  return {
    full: locationString,
    city: parts[0] || undefined,           // Premier élément = ville
    district: parts[1] || undefined,       // Deuxième élément = district/quartier
    region: parts.length > 2 ? parts[parts.length - 2] : undefined,  // Avant-dernier = région
    country: parts[parts.length - 1] || undefined,  // Dernier élément = pays
    raw: parts,
  };
}

/**
 * Formate une localisation parsée pour l'affichage
 */
export function formatLocationDisplay(location: ParsedLocation): {
  primary: string;
  secondary: string;
} {
  return {
    primary: location.city || location.full,
    secondary: [location.region, location.country].filter(Boolean).join(', '),
  };
}
