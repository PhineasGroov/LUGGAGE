import api from '@/lib/api';
import { Travel, CreateTravelData } from '@/types';

export const travelService = {
  getAll: () => 
    api.get<Travel[]>('/travels'),
  
  getById: (id: string) => 
    api.get<Travel>(`/travels/${id}`),
  
  create: (data: CreateTravelData) => 
    api.post<Travel>('/travels', data),
  
  update: (id: string, data: Partial<CreateTravelData>) => 
    api.put<Travel>(`/travels/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/travels/${id}`),
};
