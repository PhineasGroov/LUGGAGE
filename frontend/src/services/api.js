import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

// Instance Axios avec configuration de base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services d'authentification
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (formData) => api.post('/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }),
};

// Services utilisateur
export const userAPI = {
  getMe: () => api.get('/users/me'),
};

// Services voyages
export const travelAPI = {
  getAll: () => api.get('/travels'),
  create: (travelData) => api.post('/travels', travelData),
};

// Services colis
export const packageAPI = {
  getAll: () => api.get('/packages'),
  getMy: () => api.get('/packages/my-packages'),
  create: (packageData) => api.post('/packages', packageData),
  assignToTravel: (packageId, travelId) => 
    api.patch(`/packages/${packageId}/assign-travel?travel_id=${travelId}`),
};

export default api;