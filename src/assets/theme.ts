import { createTheme, type PaletteOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const getPaletteTheme = (mode: 'light' | 'dark'): PaletteOptions => ({
  mode,
  ...(mode === 'light'
    ? {}
    : {
        primary: {
          main: '#0ea5e9',
        },
      }),
});

const createDefaultThemeMode = (mode: 'light' | 'dark') =>
  createTheme({
    cssVariables: true,
    palette: getPaletteTheme(mode),
    components: {
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          size: 'small',
          variant: 'filled',
        },
      },

      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
      },

      MuiDatePicker: {
        defaultProps: {
          slotProps: {
            textField: {
              fullWidth: true,
              size: 'small',
              variant: 'filled',
            },
          },
        },
      },
    },
  });

const theme = createTheme({ cssVariables: true });

export { theme, createDefaultThemeMode };
