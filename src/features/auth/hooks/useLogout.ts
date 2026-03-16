import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@services/auth.service';
import useAuth from './useAuth';
import usePersistLogin from './usePersistLogin';
import { clearAccessToken } from '@lib/authStore';

const useLogout = () => {
  const { setAuth } = useAuth();
  const [, , removePersistLogin] = usePersistLogin();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onMutate: () => {
      queryClient.clear();
      removePersistLogin();
    },
    onSettled: () => {
      setAuth(undefined);
      clearAccessToken();
    },
  });

  return mutation;
};

export default useLogout;
