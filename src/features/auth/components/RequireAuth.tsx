import { Navigate, Outlet } from 'react-router';

import useAuth from '../hooks/useAuth';

function RequireAuth() {
  const { auth } = useAuth();

  return auth?.token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RequireAuth;
