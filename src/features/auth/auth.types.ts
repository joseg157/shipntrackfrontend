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

export interface AuthContextValue {
  auth?: LoginResponse;
  setAuth: Dispatch<SetStateAction<LoginResponse | undefined>>;
}
