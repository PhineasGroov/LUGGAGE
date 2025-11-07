export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
}
