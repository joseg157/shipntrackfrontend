import useLocalStorage from '@hooks/useLocalStorage';
import { PERSIST_LOGIN_KEY } from '../constants';

const usePersistLogin = () =>
  useLocalStorage({
    key: PERSIST_LOGIN_KEY,
    initialValue: false,
  });

export default usePersistLogin;
