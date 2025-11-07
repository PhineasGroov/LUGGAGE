import api from '@/lib/api';
import { Package, CreatePackageData } from '@/types';

export const packageService = {
  getAll: () => 
    api.get<Package[]>('/packages'),
  
  getById: (id: string) => 
    api.get<Package>(`/packages/${id}`),
  
  create: (data: CreatePackageData) => 
    api.post<Package>('/packages', data),
  
  update: (id: string, data: Partial<CreatePackageData>) => 
    api.put<Package>(`/packages/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/packages/${id}`),
};
