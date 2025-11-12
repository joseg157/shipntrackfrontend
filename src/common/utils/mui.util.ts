import { type Theme } from '@mui/material';

export const getSxTransitionMixin = (isExpanded?: boolean, property = 'width') => ({
  transition: (theme: Theme) =>
    theme.transitions.create(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
});

export const getDrawerWidthTransitionMixin = (isExpanded: boolean) => ({
  ...getSxTransitionMixin(isExpanded, 'width'),
  overflowX: 'hidden',
});
