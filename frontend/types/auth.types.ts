export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
