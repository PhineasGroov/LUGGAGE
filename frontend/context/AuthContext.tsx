'use client';

import { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { authService } from '@/services';
import { User } from '@/types';

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  error: any;
  mutate: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetcher = async () => {
  const response = await authService.getCurrentUser();
  return response.data;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, error, isLoading, mutate } = useSWR<User>('/auth/me', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const logout = () => {
    authService.logout();
    mutate(undefined, false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, mutate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
