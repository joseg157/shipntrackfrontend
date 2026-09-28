import { api } from '@lib/api';
import type { LoginRequest, LoginResponse } from '@interfaces/services/auth.types';

export const login = (data: LoginRequest) =>
  api<LoginResponse>({
    method: 'POST',
    url: 'Auth/login',
    data,
  });

export const logout = () =>
  api({
    method: 'DELETE',
    url: 'Auth/logout',
  });

export const refreshToken = () =>
  api<LoginResponse>({
    method: 'GET',
    url: 'Auth/refreshToken',
  });
