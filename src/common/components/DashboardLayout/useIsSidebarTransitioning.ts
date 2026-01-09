import { useState, useEffect } from 'react';
import { type Theme } from '@mui/material';

const useIsSidebarTransitioning = (isSidebarExpanded: boolean, theme: Theme) => {
  const [isSidebarFullyExpanded, setIsSidebarFullyExpanded] = useState(isSidebarExpanded);
  const [isSidebarFullyCollapsed, setIsSidebarFullyCollapsed] = useState(!isSidebarExpanded);

  useEffect(() => {
    let immediateTimeout: undefined | number;
    let transitionTime: undefined | number;

    if (isSidebarExpanded) {
      // Expanding then we set Collapsed to false immediately
      immediateTimeout = setTimeout(() => {
        setIsSidebarFullyCollapsed(false);
      }, 0);

      transitionTime = setTimeout(() => {
        setIsSidebarFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);
    } else {
      // Collapsing then we set Expanded to false immediately
      immediateTimeout = setTimeout(() => {
        setIsSidebarFullyExpanded(false);
      }, 0);

      transitionTime = setTimeout(() => {
        setIsSidebarFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);
    }

    return () => {
      clearTimeout(immediateTimeout);
      clearTimeout(transitionTime);
    };
  }, [isSidebarExpanded, theme]);

  return {
    isSidebarFullyExpanded,
    isSidebarFullyCollapsed,
  };
};

export default useIsSidebarTransitioning;
