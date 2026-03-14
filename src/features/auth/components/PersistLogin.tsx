import { useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { refreshToken } from '@services/auth.service';
import withDocumentTitle from '@components/withDocumentTitle';

import useAuth from '../hooks/useAuth';
import usePersistLogin from '../hooks/usePersistLogin';

interface PersistLoginProps {
  children: React.ReactNode;
}

function RefreshTokenLoading() {
  if (import.meta.env.PROD) {
    return null;
  }

  return <div>Loading...</div>;
}

const RefreshTokenLoadingWithTitle = withDocumentTitle(RefreshTokenLoading, {
  documentTitle: 'Loading...',
});

function PersistLogin({ children }: PersistLoginProps) {
  const { auth, setAuth } = useAuth();
  const [persistLogin, , removePersistLogin] = usePersistLogin();
  const queryClient = useQueryClient();

  // Get a new access token if there is a refresh token and no access token
  const { isFetching, isSuccess, isError, data } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: refreshToken,
    enabled: Boolean(persistLogin && !auth?.token),
    retry: false,
  });

  // If successful, set the new auth data
  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data);
    }
  }, [isSuccess, data, setAuth]);

  // If there is no refresh token or the refresh failed, remove persisted login
  useEffect(() => {
    if (isError && persistLogin) {
      removePersistLogin();
      queryClient.clear();
    }
  }, [persistLogin, isError, removePersistLogin, queryClient]);

  if (isFetching || (isSuccess && data && !auth?.token)) {
    // You can replace this with a loading spinner or skeleton component, basically we are waiting for the refresh to complete
    return <RefreshTokenLoadingWithTitle />;
  }

  return <div>{children}</div>;
}

export default PersistLogin;
