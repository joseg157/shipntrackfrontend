import { Navigate, Outlet } from 'react-router';

// import useAuth from '../hooks/useAuth';
import useAuthToken from '../hooks/useAuthToken';

function LoginAuth() {
  const [accessToken] = useAuthToken();

  return accessToken ? <Navigate to="/" replace /> : <Outlet />;
}

export default LoginAuth;
