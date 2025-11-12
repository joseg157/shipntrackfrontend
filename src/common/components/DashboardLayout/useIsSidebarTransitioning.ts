import { useState, useEffect } from 'react';
import { type Theme } from '@mui/material';

const useIsSidebarTransitioning = (isSidebarExpanded: boolean, theme: Theme) => {
  const [isSidebarFullyExpanded, setIsSidebarFullyExpanded] = useState(isSidebarExpanded);
  const [isSidebarFullyCollapsed, setIsSidebarFullyCollapsed] = useState(!isSidebarExpanded);

  useEffect(() => {
    let transitionTime: undefined | number;

    if (isSidebarExpanded) {
      // Expanding then we set Collapsed to false immediately
      setIsSidebarFullyCollapsed(false);

      transitionTime = setTimeout(() => {
        setIsSidebarFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);
    } else {
      // Collapsing then we set Expanded to false immediately
      setIsSidebarFullyExpanded(false);

      transitionTime = setTimeout(() => {
        setIsSidebarFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);
    }

    return () => {
      clearTimeout(transitionTime);
    };
  }, [isSidebarExpanded, theme]);

  return {
    isSidebarFullyExpanded,
    isSidebarFullyCollapsed,
  };
};

export default useIsSidebarTransitioning;
