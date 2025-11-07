import api from '@/lib/api';
import { UserProfile, UpdateProfileData } from '@/types';

export const userService = {
  getProfile: () => 
    api.get<UserProfile>('/users/me'),
  
  updateProfile: (data: UpdateProfileData) => 
    api.put<UserProfile>('/users/me', data),
};
