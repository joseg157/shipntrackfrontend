import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@services/auth.service';
import { setAccessToken } from '@lib/authStore';

import useAuth from './useAuth';
import usePersistLogin from './usePersistLogin';
import { DEVICE_ID_KEY } from '../constants';
import type { LoginRequest } from '../auth.types';

const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
};

const useLogin = () => {
  const { setAuth } = useAuth();
  const [, setPersitLogin] = usePersistLogin();
  const queryClient = useQueryClient();
  // need to remove refreshToken query cache on login, in case it exists

  const mutation = useMutation({
    // mutationFn: login,
    mutationFn: (data: LoginRequest) => login({ ...data, deviceId: getDeviceId() }),
    onSettled: () => {
      queryClient.removeQueries({ queryKey: ['refreshToken'] });
    },
    onSuccess: (data) => {
      setAccessToken(data?.token);

      setAuth({
        userId: data?.userId,
        username: data?.username,
        isAuthenticated: true,
      });

      setPersitLogin(true);
    },
  });

  return mutation;
};

export default useLogin;
