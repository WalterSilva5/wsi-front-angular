export interface UserModel {
  createdAt: string;
  deletedAt: string|null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    createdAt: string;
    deletedAt: string | null;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    role: string;
    updatedAt: string;
  } | null;
  error: string | null;
}
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  user: null,
  error: null,
};
