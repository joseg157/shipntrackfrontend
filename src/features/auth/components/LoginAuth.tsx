import { Navigate, Outlet } from 'react-router';

import useAuth from '../hooks/useAuth';

function LoginAuth() {
  const { auth } = useAuth();

  return auth?.isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default LoginAuth;
