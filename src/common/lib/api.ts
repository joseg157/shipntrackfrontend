import {
  type Method,
  type AxiosRequestConfig,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  create,
} from 'axios';

import { type LoginResponse } from '@features/auth';
import { getAccessToken, setAccessToken, clearAccessToken } from '@lib/authStore';

const BASE_URL = 'https://localhost:44340/api/';

const excluidedUrls = ['Auth/login', 'Auth/logout', 'Auth/refreshToken'];

const apiSetup = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface RequestConfig extends AxiosRequestConfig {
  method: Method;
}

const baseApiSetup =
  (setup: AxiosInstance) =>
  async <T>(configs: RequestConfig) => {
    const response = await setup.request<T>(configs);

    return response.data;
  };

const api = baseApiSetup(apiSetup);

apiSetup.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiSetup.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      retry?: boolean;
    };

    // avoid login, logout, refresh token
    const originalRequestUrl = originalRequest.url || '';

    if (excluidedUrls.some((url) => originalRequestUrl.includes(url))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const data = await api<LoginResponse>({
          method: 'GET',
          url: '/Auth/refreshToken',
        });

        if (data?.token) {
          setAccessToken(data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
        }

        return apiSetup(originalRequest);
      } catch (refreshTokenError) {
        window.dispatchEvent(new Event('unauthorized'));
        clearAccessToken();

        return Promise.reject(refreshTokenError);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
export type { AxiosError, isAxiosError, InternalAxiosRequestConfig } from 'axios';
