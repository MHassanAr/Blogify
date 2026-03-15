export type Role = 'admin' | 'user';

export interface AuthUser {
  id?: string;
  userName?: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  role: Role;
}