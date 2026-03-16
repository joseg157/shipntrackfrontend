import { createContext, useState, useMemo, useEffect } from 'react';
import type { AuthContextValue, AuthValue } from '../auth.types';
import { PERSIST_LOGIN_KEY } from '../constants';

const AuthContext = createContext<AuthContextValue | undefined>({
  auth: undefined,
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthValue | undefined>(undefined);

  const contextValue = useMemo(() => ({ auth, setAuth }), [auth]);

  useEffect(() => {
    const onUnauthorized = () => {
      setAuth(undefined);
      localStorage.removeItem(PERSIST_LOGIN_KEY);
    };

    window.addEventListener('unauthorized', onUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', onUnauthorized);
    };
  }, []);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
