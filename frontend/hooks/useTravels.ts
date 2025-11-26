import useSWR from 'swr';
import { travelService } from '@/services/travel.service';
import type { Travel, TravelCreate, TravelFilters } from '@/types/travel.types';

/**
 * Hook SWR pour récupérer tous les voyages de l'utilisateur connecté
 * Cache automatique, revalidation et mise à jour en temps réel
 */
export function useMyTravels() {
  const { data, error, isLoading, mutate } = useSWR<Travel[]>(
    '/travels/my',
    () => travelService.getMyTravels(),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    travels: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook SWR pour récupérer tous les voyages disponibles
 */
export function useAllTravels() {
  const { data, error, isLoading, mutate } = useSWR<Travel[]>(
    '/travels',
    () => travelService.getAllTravels(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    travels: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook SWR pour récupérer un voyage spécifique par ID
 */
export function useTravel(id?: number) {
  const fetcher = async () => {
    if (!id) return undefined;
    const travels = await travelService.getAllTravels();
    return travels.find(t => t.id === id);
  };

  const { data: travel, error, isLoading, mutate } = useSWR<Travel | undefined>(
    id ? `/travels/${id}` : null,
    fetcher
  );

  return {
    travel,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook pour les mutations de voyage (create, update, delete)
 * Utilise le mutate de SWR pour invalider le cache
 */
export function useTravelMutations() {
  const { mutate: mutateMyTravels } = useMyTravels();
  const { mutate: mutateAllTravels } = useAllTravels();

  const createTravel = async (data: TravelCreate) => {
    const newTravel = await travelService.createTravel(data);
    // Invalider les caches pour forcer un refetch
    await Promise.all([
      mutateMyTravels(),
      mutateAllTravels(),
    ]);
    return newTravel;
  };

  const updateTravel = async (id: number, data: Partial<TravelCreate>) => {
    const updated = await travelService.updateTravel(id, data as TravelCreate);
    await Promise.all([
      mutateMyTravels(),
      mutateAllTravels(),
    ]);
    return updated;
  };

  const deleteTravel = async (id: number) => {
    await travelService.deleteTravel(id);
    await Promise.all([
      mutateMyTravels(),
      mutateAllTravels(),
    ]);
  };

  const searchTravels = async (filters: TravelFilters) => {
    return travelService.searchTravels(filters);
  };

  return {
    createTravel,
    updateTravel,
    deleteTravel,
    searchTravels,
  };
}
