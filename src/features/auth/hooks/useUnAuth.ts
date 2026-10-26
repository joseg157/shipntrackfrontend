import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useAuthToken from './useAuthToken';
import { toast } from 'react-toastify';

const useUnAuth = () => {
  const [, , removeToken] = useAuthToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUnauthorize = () => {
      removeToken();
      queryClient.clear();
      toast.error('Session expired. Please log in again.', {
        toastId: 'session-expired',
      });
    };

    window.addEventListener('unauthorized', onUnauthorize);

    return () => {
      window.removeEventListener('unauthorized', onUnauthorize);
    };
  }, [removeToken, queryClient]);
};

export default useUnAuth;
