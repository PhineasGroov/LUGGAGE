export interface Travel {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
  available_weight: number;
  price_per_kg: number;
  status: string;
}

export interface CreateTravelData {
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
  available_weight: number;
  price_per_kg: number;
}
