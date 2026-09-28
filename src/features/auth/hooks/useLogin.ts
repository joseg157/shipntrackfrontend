import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@services/auth.service';
// import { setAccessToken } from '@lib/authStore';
import { AUTH__KEYS } from '@utils/queryKeys';

// import useAuth from './useAuth';
// import usePersistLogin from './usePersistLogin';
import useAuthToken from './useAuthToken';
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
  // const { setAuth } = useAuth();
  const [, setAccessToken] = useAuthToken();
  const queryClient = useQueryClient();
  // need to remove refreshToken query cache on login, in case it exists

  const mutation = useMutation({
    // mutationFn: login,
    mutationKey: AUTH__KEYS.LOGIN(),
    mutationFn: (data: LoginRequest) => login({ ...data, deviceId: getDeviceId() }),
    onSettled: () => {
      queryClient.removeQueries({ queryKey: AUTH__KEYS.REFRESH_TOKEN() });
    },
    onSuccess: (data) => {
      // setAuth({
      //   userId: data?.userId,
      //   username: data?.username,
      //   isAuthenticated: true,
      // });

      if (data?.token) {
        setAccessToken(data?.token);
      }
    },
  });

  return mutation;
};

export default useLogin;
