import axios,{
  type Method,
  type AxiosRequestConfig,
//   AxiosError,
//   InternalAxiosRequestConfig,
  type AxiosInstance,
} from 'axios';

const BASE_URL = 'https://localhost:44373/api/';

export interface RequestConfig  extends AxiosRequestConfig {
  method: Method;
}

const baseApiSetup =
  (setup: AxiosInstance) =>
  async <T>( configs : RequestConfig) => {
    const response = await setup.request<T>(configs);

    return response.data;
  };

const api = baseApiSetup(axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}));

const publicApi = baseApiSetup(axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}));

export { api, publicApi };
export type {AxiosError, isAxiosError, InternalAxiosRequestConfig} from 'axios';