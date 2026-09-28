import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@services/auth.service';
// import { clearAccessToken } from '@lib/authStore'; // Since token is store in memory, no need to clear it from local storage after navigation it should be automatically cleared
import { useNavigate } from 'react-router';
import { AUTH__KEYS } from '@utils/queryKeys';
// import useAuth from './useAuth';
import useAuthToken from './useAuthToken';

const useLogout = () => {
  // const { setAuth } = useAuth();
  const [, , removeAccessToken] = useAuthToken();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    mutationKey: AUTH__KEYS.LOGOUT(),
    onSettled: () => {
      // 1. Signal the unauthorized event to trigger the AuthProvider's effect (For other tabs)
      window.dispatchEvent(new Event('unauthorized'));

      // 2. Clear the query cache and remove persisted login for the current tab
      queryClient.clear();
      removeAccessToken();

      // 3. Navigate to the login page for the current tab
      navigate('/login');
    },
  });

  return mutation;
};

export default useLogout;
