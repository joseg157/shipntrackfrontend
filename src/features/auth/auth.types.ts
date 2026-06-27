import type { Dispatch, SetStateAction } from 'react';

export interface LoginRequest {
  username: string;
  password: string;
  deviceId?: string;
}

export interface LoginResponse {
  userId?: string;
  username?: string;
  token?: string; // access token
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
