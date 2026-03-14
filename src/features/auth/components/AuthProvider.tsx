import { createContext, useState, useMemo } from 'react';
import type { AuthContextValue, LoginResponse } from '../auth.types';

const AuthContext = createContext<AuthContextValue | undefined>({
  auth: undefined,
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<LoginResponse | undefined>(undefined);

  const contextValue = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
