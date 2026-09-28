import useLocalStorage from '@hooks/useLocalStorage';
import { ACCESS_TOKEN_KEY } from '../constants';

const useAuthToken = () =>
  useLocalStorage<string | null>({
    key: ACCESS_TOKEN_KEY,
    initialValue: null,
  });

export default useAuthToken;
