import { Fragment, useState, useCallback } from 'react';
import {
  Box,
  List,
  ListSubheader,
  ListItem,
  Collapse,
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grow,
  Paper,
  Divider,
  Avatar,
  type SxProps,
  type Theme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { type NavigationItems, type NavigationPageItem } from '@interfaces/navigation.types';
import { dashboardLayoutConstants } from '@utils/constants';
import { getSxTransitionMixin } from '@utils/mui.util';
import cn from '@utils/cn';

const { DRAWER_MINI_WIDTH, DRAWER_WIDTH, LIST_ITEM_ICON_SIZE } = dashboardLayoutConstants;

interface DashboardNavigationProps {
  navigationItems?: NavigationItems;
  isMini?: boolean;
  depth?: number;
  isFullyExpanded?: boolean;
  isFullyCollapsed?: boolean;
  hasSidebarTransition?: boolean;
  onLinkClick?: () => void;
  isPopover?: boolean;
  currentPath: string;
}

interface SidebarPageItemProps
  extends Omit<DashboardNavigationProps, 'navigationItems' | 'hasSidebarTransition' | 'isPopover'> {
  id: string;
  item: NavigationPageItem;
}

const isActiveLink = (pathName: string, linkPath: string) => pathName === linkPath;

function SidebarPageItem({
  id,
  item,
  currentPath,
  onLinkClick,
  depth = 0,
  isMini = false,
  isFullyExpanded = true,
  isFullyCollapsed = false,
}: SidebarPageItemProps) {
  const { title, icon, path, children } = item;
  const [hoveredMiniSidebarItemId, setHoveredMiniSidebarItemId] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(false);

  const handlePageItemClick = () => {
    onLinkClick?.();
  };

  let nestedNavigationCollapseSx: SxProps<Theme> = { display: 'none' };

  if (isMini && isFullyCollapsed) {
    nestedNavigationCollapseSx = {
      fontSize: 19,
      position: 'absolute',
      top: '50%',
      right: '-1px',
      transform: 'translateY(-50%) rotate(-90deg)',
    };
  } else if (!isMini && isFullyExpanded) {
    nestedNavigationCollapseSx = {
      ml: 0.5,
      transform: `rotate(${expanded ? 0 : -90}deg)`,
      transition: (theme: Theme) =>
        theme.transitions.create('transform', {
          easing: theme.transitions.easing.sharp,
          duration: 100,
        }),
    };
  }

  const renderNestedNavigation = useCallback(
    () => (
      <DashboardNavigation
        navigationItems={children}
        depth={depth + 1}
        onLinkClick={onLinkClick}
        isPopover={isMini}
        currentPath={currentPath}
      />
    ),
    [children, currentPath, depth, isMini, onLinkClick],
  );

  return (
    <Fragment key={id}>
      <ListItem
        id={id}
        className="tw:overflow-x-hidden tw:px-2 tw:py-0"
        // Handle mini sidebar hover behavior
        {...(children && isMini
          ? {
              onMouseEnter: () => setHoveredMiniSidebarItemId(id),
              onMouseLeave: () => setHoveredMiniSidebarItemId(null),
              onClick: () => setExpanded(false),
            }
          : {})}
        // Handle nested navigation expansion
        {...(children && !isMini
          ? {
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            }
          : {})}
      >
        <Tooltip
          title={title}
          disableFocusListener={!isMini}
          disableHoverListener={!isMini}
          disableTouchListener={!isMini}
          placement="bottom"
        >
          <ListItemButton
            className={cn('tw:rounded-lg tw:px-2', {
              'tw:bg-sky-300/60 tw:text-black': path && isActiveLink(currentPath || '', path || ''),
            })}
            onClick={children ? undefined : handlePageItemClick}
            sx={{
              height: 40,
            }}
          >
            {(icon || isMini) && (
              <Box
                sx={
                  isMini
                    ? {
                        position: 'absolute',
                        left: 'calc(50% - 2px)',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }
                    : {}
                }
              >
                <ListItemIcon
                  className="tw:flex tw:items-center tw:justify-center tw:text-xl"
                  sx={{
                    minWidth: LIST_ITEM_ICON_SIZE,
                  }}
                >
                  {icon ?? null}
                  {!icon && isMini && (
                    <Avatar
                      sx={{
                        width: LIST_ITEM_ICON_SIZE - 7,
                        height: LIST_ITEM_ICON_SIZE - 7,
                        fontSize: 12,
                      }}
                    >
                      {title
                        ?.split(' ')
                        .slice(0, 2)
                        .map((titleWord) => titleWord.charAt(0).toUpperCase())}
                    </Avatar>
                  )}
                </ListItemIcon>
              </Box>
            )}

            {!isMini && <ListItemText className="tw:ml-3" primary={title} />}

            {children && <ExpandMoreIcon sx={nestedNavigationCollapseSx} />}
          </ListItemButton>
        </Tooltip>

        {children && isMini && (
          <Grow in={hoveredMiniSidebarItemId === id}>
            <Box
              className="tw:fixed tw:pl-6"
              sx={{
                left: DRAWER_MINI_WIDTH - 2,
              }}
            >
              <Paper
                sx={{
                  pt: 0.5,
                  pb: 0.5,
                  transform: 'translateY(calc(50% - 30px))',
                }}
              >
                {renderNestedNavigation()}
              </Paper>
            </Box>
          </Grow>
        )}
      </ListItem>

      {children && !isMini && (
        <Collapse in={expanded} timeout="auto" unmountOnExit className="tw:relative tw:pl-4">
          <div className="tw:absolute tw:ml-3 tw:h-full tw:border-l-2 tw:border-solid tw:border-sky-300" />
          {renderNestedNavigation()}
        </Collapse>
      )}
    </Fragment>
  );
}

function DashboardNavigation({
  navigationItems,
  onLinkClick,
  isMini = false,
  depth = 0,
  isFullyExpanded = true,
  isFullyCollapsed = false,
  hasSidebarTransition = false,
  isPopover = false,
  currentPath,
}: DashboardNavigationProps) {
  return (
    <List
      className="tw:p-0"
      sx={{
        padding: 0,
        mt: isPopover && depth === 1 ? 0.5 : 0,
        mb: depth === 0 && !isPopover ? 4 : 0.5,
        pl: (isPopover ? 1 : 2) * (isPopover ? depth - 1 : depth),
        minWidth: isPopover && depth === 1 ? 240 : 'auto',
        width: isMini ? DRAWER_MINI_WIDTH : 'auto',
      }}
    >
      {navigationItems?.map((item, itemIndex) => {
        if (item.kind === 'header') {
          return (
            <ListSubheader
              key={`subheader-${depth}-${itemIndex}`}
              className="tw:overflow-hidden tw:px-2 tw:text-ellipsis tw:whitespace-nowrap"
              sx={{
                height: isMini ? 0 : 40,
                minWidth: DRAWER_WIDTH,
                ...(hasSidebarTransition ? getSxTransitionMixin(isFullyCollapsed, 'height') : {}),
              }}
            >
              {item.title}
            </ListSubheader>
          );
        }

        if (item.kind === 'divider') {
          const nextItem = navigationItems[itemIndex + 1];

          return (
            <li key={`divider-${depth}-${itemIndex}`}>
              <Divider
                className="tw:mx-2 tw:mt-1 tw:border-b-2"
                sx={{
                  mb: nextItem?.kind === 'header' && !isMini ? 0 : 1,
                  ...(hasSidebarTransition ? getSxTransitionMixin(isFullyCollapsed, 'margin') : {}),
                }}
              />
            </li>
          );
        }

        const pageItemId = `page-${depth}-${itemIndex}`;

        return (
          <SidebarPageItem
            key={pageItemId}
            id={pageItemId}
            item={item}
            currentPath={currentPath}
            isFullyCollapsed={isFullyCollapsed}
            isFullyExpanded={isFullyExpanded}
            isMini={isMini}
            onLinkClick={onLinkClick}
            depth={depth}
          />
        );
      })}
    </List>
  );
}

export default DashboardNavigation;
