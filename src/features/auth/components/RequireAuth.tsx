import { Navigate, Outlet } from 'react-router';

// import useAuth from '../hooks/useAuth';
import useAuthToken from '../hooks/useAuthToken';

function RequireAuth() {
  // const { auth } = useAuth();
  const [accessToken] = useAuthToken();

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RequireAuth;
