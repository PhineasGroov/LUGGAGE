export interface Package {
  id: string;
  title: string;
  description: string;
  weight: number;
  size: string;
  origin: string;
  destination: string;
  status: string;
}

export interface CreatePackageData {
  title: string;
  description: string;
  weight: number;
  size: string;
  origin: string;
  destination: string;
}
