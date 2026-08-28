import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { refreshToken } from '@services/auth.service';
import DocumentTitle from '@components/DocumentTitle';

import useAuth from '../hooks/useAuth';
import usePersistLogin from '../hooks/usePersistLogin';
import { setAccessToken, clearAccessToken } from '@lib/authStore';

interface PersistLoginProps {
  children: React.ReactNode;
}

function RefreshTokenLoading() {
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <>
      <DocumentTitle documentTitle="Loading ..." />
      <div>Loading...</div>
    </>
  );
}

function PersistLogin({ children }: PersistLoginProps) {
  const { auth, setAuth } = useAuth();
  const [persistLogin, , removePersistLogin] = usePersistLogin();

  const { isFetching, isSuccess, isError, data } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: refreshToken,
    enabled: Boolean(persistLogin && !auth?.isAuthenticated),
    retry: false,
  });

  // If successful, set the new auth data
  useEffect(() => {
    if (isSuccess && data) {
      setAuth({
        userId: data?.userId,
        username: data?.username,
        isAuthenticated: true,
      });

      setAccessToken(data?.token);
    }
  }, [isSuccess, data, setAuth]);

  useEffect(() => {
    if (isError && persistLogin) {
      removePersistLogin();
      clearAccessToken();
    }
  }, [isError, removePersistLogin, persistLogin]);

  if (isFetching || (isSuccess && !auth?.isAuthenticated)) {
    // You can replace this with a loading spinner or skeleton component, basically we are waiting for the refresh to complete
    return <RefreshTokenLoading />;
  }

  return <div className="tw:animate-fade-in">{children}</div>;
}

export default PersistLogin;
