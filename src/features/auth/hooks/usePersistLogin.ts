import useLocalStorage from '@hooks/useLocalStorage';

const usePersistLogin = () =>
  useLocalStorage({
    key: import.meta.env.PROD ? 'allow' : 'persist_login_dev',
    initialValue: false,
  });

export default usePersistLogin;
