import { useAuth } from '@/context/AuthContext';

export const useUser = () => {
  const { user, isLoading, error } = useAuth();
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
};
