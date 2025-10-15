import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  StyledEngineProvider,
  ThemeProvider,
  type Theme,
} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import CssBaseline from '@mui/material/CssBaseline';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createDefaultThemeMode } from '@assets/theme';

interface MuiProviderProps {
  children: React.ReactNode;
}

function MuiProvider({ children }: MuiProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultTheme = useMemo<Theme>(
    () => createDefaultThemeMode(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MuiProvider;
