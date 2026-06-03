import { useMemo, useEffect } from 'react';
import { StyledEngineProvider, ThemeProvider, type Theme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import CssBaseline from '@mui/material/CssBaseline';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createDefaultThemeMode } from '@assets/theme';
import useDarkMode from '@hooks/useDarkMode';

interface MuiProviderProps {
  children: React.ReactNode;
}

function MuiProvider({ children }: MuiProviderProps) {
  const [mode] = useDarkMode();

  // Sync Tailwind class with state
  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  const defaultTheme = useMemo<Theme>(() => createDefaultThemeMode(mode), [mode]);

  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MuiProvider;
