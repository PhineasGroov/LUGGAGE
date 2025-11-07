import api from '@/lib/api';
import { LoginCredentials, RegisterData, User } from '@/types';

export const authService = {
  login: (credentials: LoginCredentials) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    return api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },
  
  register: (data: RegisterData) => 
    api.post('/auth/register', data),

  logout: () => {
    document.cookie = 'token=; path=/; max-age=0';
    window.location.href = '/auth/login';
  },

  getCurrentUser: () => 
    api.get<User>('/auth/me'),
};
