import { publicApi } from '@lib/api';
import type { LoginRequest, LoginResponse } from '@features/auth';

export const login = (data: LoginRequest) =>
  publicApi<LoginResponse>({
    method: 'POST',
    url: 'Auth/login',
    data,
  });

export const logout = () =>
  publicApi({
    method: 'DELETE',
    url: 'Auth/logout',
  });

export const refreshToken = () =>
  publicApi<LoginResponse>({
    method: 'GET',
    url: 'Auth/refreshToken',
  });
