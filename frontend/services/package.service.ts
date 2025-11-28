import api from '@/lib/api';
import { Package, PackageCreate, PackageUpdate, PackageFilters } from '@/types';

export const packageService = {
  // Récupérer tous les colis
  getAllPackages: async (): Promise<Package[]> => {
    const response = await api.get('/packages/');
    return response.data;
  },
  
  // Récupérer mes colis uniquement
  getMyPackages: async (): Promise<Package[]> => {
    const response = await api.get('/packages/my-packages');
    return response.data;
  },
  
  // Récupérer un colis par ID
  getPackageById: async (id: number): Promise<Package> => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },
  
  // Créer un nouveau colis
  createPackage: async (data: PackageCreate): Promise<Package> => {
    const response = await api.post('/packages/', data);
    return response.data;
  },
  
  // Mettre à jour un colis
  updatePackage: async (id: number, data: PackageUpdate): Promise<Package> => {
    const response = await api.patch(`/packages/${id}`, data);
    return response.data;
  },
  
  // Assigner un colis à un voyage (par le voyageur)
  assignPackageToTravel: async (packageId: number, travelId: number): Promise<Package> => {
    const response = await api.patch(`/packages/${packageId}/assign-travel?travel_id=${travelId}`);
    return response.data;
  },
  
  // Rechercher des colis avec filtres
  searchPackages: async (filters: PackageFilters): Promise<Package[]> => {
    const packages = await packageService.getAllPackages();
    
    return packages.filter(pkg => {
      if (filters.status && pkg.status !== filters.status) {
        return false;
      }
      if (filters.sender_id && pkg.sender_id !== filters.sender_id) {
        return false;
      }
      if (filters.travel_id !== undefined && pkg.travel_id !== filters.travel_id) {
        return false;
      }
      if (filters.min_weight && pkg.weight_kg < filters.min_weight) {
        return false;
      }
      if (filters.max_weight && pkg.weight_kg > filters.max_weight) {
        return false;
      }
      return true;
    });
  },
};
