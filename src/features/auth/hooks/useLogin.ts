import { useMutation } from '@tanstack/react-query';
import { login } from '@services/auth.service';

import useAuth from './useAuth';
import usePersistLogin from './usePersistLogin';

const useLogin = () => {
  const { setAuth } = useAuth();
  const [, setPersitLogin] = usePersistLogin();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data);
      setPersitLogin(true);
    },
  });

  return mutation;
};

export default useLogin;
