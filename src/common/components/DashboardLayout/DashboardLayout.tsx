import { useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import {
  Drawer as Sidebar,
  useTheme,
  useMediaQuery,
  Box,
  ListItem,
  Tooltip,
  IconButton,
  type Theme,
  type SxProps,
} from '@mui/material';
import { MdMenuOpen } from 'react-icons/md';

import { getDrawerWidthTransitionMixin, getSxTransitionMixin } from '@utils/mui.util';

import Topbar from '@components/Topbar';
import Copyright from '@components/Copyright';
import type { NavigationItems } from '@interfaces/navigation.types';
import { dashboardLayoutConstants } from '@utils/constants';

import useIsSidebarTransitioning from './useIsSidebarTransitioning';
import DashboardNavigation from './DashboardNavigation';

const { DRAWER_WIDTH, DRAWER_MINI_WIDTH } = dashboardLayoutConstants;

interface DashboardLayoutProps {
  /**
   * The content of the layout.
   */
  children: React.ReactNode;

  /**
   * Whether the sidebar should start collapsed in desktop size screens.
   * @default false
   */
  defaultSidebarCollapsed?: boolean;

  /**
   * Callback fired when the sidebar expanded state changes for desktop size screens.
   * @param expanded The new expanded state.
   */
  onChangeSidebarCollapsed?: (collapsed: boolean) => void;

  /**
   * Navigation items to be displayed in the sidebar.
   */

  navigationItems?: NavigationItems;
}

function DashboardLayout({
  defaultSidebarCollapsed = false,
  onChangeSidebarCollapsed,
  children,
  navigationItems,
}: DashboardLayoutProps) {
  const theme = useTheme();
  const location = useLocation();

  // State to control mobile sidebar open/close
  const [isMobileSidebarExpanded, setIsMobileSidebarExpanded] = useState(false);
  // State to control desktop drawer expanded/collapsed
  const [isDesktopSidebarExpanded, setIsDesktopSidebarExpanded] =
    useState(!defaultSidebarCollapsed);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const isDrawerExpanded = isOverMdViewport ? isDesktopSidebarExpanded : isMobileSidebarExpanded;

  const setIsNavigationExpanded = useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopSidebarExpanded(newExpanded);
        onChangeSidebarCollapsed?.(!newExpanded);
      } else {
        setIsMobileSidebarExpanded(newExpanded);
      }
    },
    [isOverMdViewport, onChangeSidebarCollapsed],
  );

  // Drawer transition state
  // Why not just use isDrawerExpanded directly?
  // B/c we want to know when the transition is fully completed to avoid
  // flickering when the content is rendered.
  const { isSidebarFullyExpanded, isSidebarFullyCollapsed } = useIsSidebarTransitioning(
    isDrawerExpanded,
    theme,
  );

  const handleSetNavigationExpanded = useCallback(
    (newExpanded: boolean) => () => {
      setIsNavigationExpanded(newExpanded);
    },
    [setIsNavigationExpanded],
  );

  const handleNavigationLinkOnClick = useCallback(() => {
    setIsMobileSidebarExpanded(false);
  }, []);

  const hasSidebarTransition = isOverSmViewport && isOverMdViewport;

  const getSidebarSharedSx = useCallback(
    (isMini: boolean, isTemp?: boolean): SxProps<Theme> => {
      const drawerWidth = isMini ? DRAWER_MINI_WIDTH : DRAWER_WIDTH;

      return {
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(isDrawerExpanded),
        ...(isTemp ? { position: 'absolute' } : {}),
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          ...getDrawerWidthTransitionMixin(isDrawerExpanded),
        },
      };
    },
    [isDrawerExpanded],
  );

  const renderSidebarContent = useCallback(
    (isMini: boolean, viewport: 'phone' | 'tablet' | 'laptop', onSidebarToggle: () => void) => {
      return (
        <>
          {viewport !== 'phone' && <div className="tw:h-topbar" />}

          <Box
            className="tw:relative tw:flex tw:h-full tw:flex-col tw:overflow-x-hidden tw:overflow-y-auto"
            sx={{
              scrollbarGutter: isMini ? 'stable' : 'auto',
              ...(hasSidebarTransition
                ? getSxTransitionMixin(isSidebarFullyExpanded, 'padding')
                : {}),
            }}
          >
            <ListItem
              key="sidebar-toggle-button"
              className="tw:relative tw:px-2 tw:py-0"
              component="div"
            >
              <Box
                className="tw:px-1 tw:py-0"
                sx={{
                  marginLeft: isMini ? 0 : 'auto',
                  ...(hasSidebarTransition
                    ? getSxTransitionMixin(isSidebarFullyCollapsed, 'margin')
                    : {}),
                }}
              >
                <Tooltip title={isMini ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
                  <IconButton
                    className="tw:flex tw:items-center tw:justify-center tw:text-2xl"
                    onClick={onSidebarToggle}
                  >
                    <MdMenuOpen />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>

            <DashboardNavigation
              currentPath={location.pathname}
              isMini={isMini}
              navigationItems={navigationItems}
              isFullyCollapsed={isSidebarFullyCollapsed}
              isFullyExpanded={isSidebarFullyExpanded}
              hasSidebarTransition={hasSidebarTransition}
              onLinkClick={handleNavigationLinkOnClick}
            />
          </Box>
        </>
      );
    },
    [
      handleNavigationLinkOnClick,
      hasSidebarTransition,
      isSidebarFullyCollapsed,
      isSidebarFullyExpanded,
      location.pathname,
      navigationItems,
    ],
  );

  return (
    <div className="tw:relative tw:flex tw:h-dvh tw:overflow-hidden">
      <Topbar
        showMenuIconOnMobile={!isOverSmViewport}
        onToggleMenu={handleSetNavigationExpanded(true)}
      />

      {/* Mobile */}
      <Sidebar
        variant="temporary"
        open={isMobileSidebarExpanded}
        onClose={handleSetNavigationExpanded(false)}
        className="tw:block tw:flex-shrink-0 tw:sm:hidden"
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={getSidebarSharedSx(false, true)}
      >
        {renderSidebarContent(false, 'phone', handleSetNavigationExpanded(false))}
      </Sidebar>

      {/* Tablet */}
      <Sidebar
        variant="permanent"
        className="tw:hidden tw:sm:block tw:md:hidden"
        sx={getSidebarSharedSx(!isMobileSidebarExpanded)}
      >
        {renderSidebarContent(
          !isMobileSidebarExpanded,
          'tablet',
          handleSetNavigationExpanded(!isMobileSidebarExpanded),
        )}
      </Sidebar>

      {/* Laptop */}
      <Sidebar
        variant="permanent"
        className="tw:hidden tw:flex-shrink-0 tw:md:block"
        sx={getSidebarSharedSx(!isDesktopSidebarExpanded)}
      >
        {renderSidebarContent(
          !isDesktopSidebarExpanded,
          'laptop',
          handleSetNavigationExpanded(!isDesktopSidebarExpanded),
        )}
      </Sidebar>

      {/* Content */}
      <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col">
        {/* Fixed Placement: Make sure the contents is placed below the topbar component */}
        <div className="tw:h-topbar" />

        <div className="tw:flex tw:flex-1 tw:flex-col tw:overflow-auto tw:px-2 tw:pt-4">
          <div className="tw:flex-1">{children}</div>

          <div className="tw:pb-2">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
