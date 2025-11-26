import api from '@/lib/api';
import { Travel, TravelCreate, TravelFilters } from '@/types';

export const travelService = {
  // Récupérer tous les voyages
  getAllTravels: async (): Promise<Travel[]> => {
    const response = await api.get('/travels/');
    return response.data;
  },
  
  // Récupérer mes voyages uniquement
  getMyTravels: async (): Promise<Travel[]> => {
    const response = await api.get('/travels/my-travels');
    return response.data;
  },
  
  // Récupérer un voyage par ID
  getTravelById: async (id: number): Promise<Travel> => {
    const response = await api.get(`/travels/${id}`);
    return response.data;
  },
  
  // Créer un nouveau voyage
  createTravel: async (data: TravelCreate): Promise<Travel> => {
    const response = await api.post('/travels/', data);
    return response.data;
  },
  
  // Mettre à jour un voyage
  updateTravel: async (id: number, data: TravelCreate): Promise<Travel> => {
    const response = await api.put(`/travels/${id}`, data);
    return response.data;
  },
  
  // Supprimer un voyage
  deleteTravel: async (id: number): Promise<void> => {
    await api.delete(`/travels/${id}`);
  },
  
  // Rechercher des voyages avec filtres
  searchTravels: async (filters: TravelFilters): Promise<Travel[]> => {
    const travels = await travelService.getAllTravels();
    
    return travels.filter(travel => {
      if (filters.origin && !travel.origin.toLowerCase().includes(filters.origin.toLowerCase())) {
        return false;
      }
      if (filters.destination && !travel.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
      if (filters.travel_date && travel.travel_date !== filters.travel_date) {
        return false;
      }
      if (filters.min_capacity && travel.capacity_kg < filters.min_capacity) {
        return false;
      }
      return true;
    });
  },
};
