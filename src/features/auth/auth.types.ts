import type { Dispatch, SetStateAction } from 'react';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId?: string;
  username?: string;
  token?: string;
}

export interface AuthValue {
  userId?: string;
  username?: string;
  isAuthenticated: boolean;
}

export interface AuthContextValue {
  auth?: AuthValue;
  setAuth: Dispatch<SetStateAction<AuthValue | undefined>>;
}
