import useLocalStorage from './useLocalStorage';

const useDarkMode = () =>
  useLocalStorage<'light' | 'dark'>({
    key: 'darkMode',
    initialValue: 'light',
  });

export default useDarkMode;
