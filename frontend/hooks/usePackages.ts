import useSWR from 'swr';
import { packageService } from '@/services/package.service';
import type { Package, PackageCreate } from '@/types/package.types';

/**
 * Hook SWR pour récupérer tous les colis de l'utilisateur connecté
 * Cache automatique avec revalidation
 */
export function useMyPackages() {
  const { data, error, isLoading, mutate } = useSWR<Package[]>(
    '/packages/my',
    () => packageService.getMyPackages(),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    packages: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook SWR pour récupérer tous les colis disponibles
 */
export function useAllPackages() {
  const { data, error, isLoading, mutate } = useSWR<Package[]>(
    '/packages',
    () => packageService.getAllPackages(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    packages: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook SWR pour récupérer un package spécifique par ID
 */
export function usePackage(id?: number) {
  const fetcher = async () => {
    if (!id) return undefined;
    const packages = await packageService.getAllPackages();
    return packages.find(p => p.id === id);
  };

  const { data: packageData, error, isLoading, mutate } = useSWR<Package | undefined>(
    id ? `/packages/${id}` : null,
    fetcher
  );

  return {
    package: packageData,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook pour les mutations de colis (create, assign)
 * Utilise le mutate de SWR pour invalider le cache
 */
export function usePackageMutations() {
  const { mutate: mutateMyPackages } = useMyPackages();
  const { mutate: mutateAllPackages } = useAllPackages();

  const createPackage = async (data: PackageCreate) => {
    const newPackage = await packageService.createPackage(data);
    // Invalider les caches
    await Promise.all([
      mutateMyPackages(),
      mutateAllPackages(),
    ]);
    return newPackage;
  };

  const assignPackageToTravel = async (packageId: number, travelId: number) => {
    const updated = await packageService.assignPackageToTravel(packageId, travelId);
    await Promise.all([
      mutateMyPackages(),
      mutateAllPackages(),
    ]);
    return updated;
  };

  const searchPackages = async (filters: any) => {
    return packageService.searchPackages(filters);
  };

  return {
    createPackage,
    assignPackageToTravel,
    searchPackages,
  };
}
