import Appbar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { MdMenuOpen } from 'react-icons/md';

import { TbTruckDelivery } from 'react-icons/tb';
import useDarkMode from '@hooks/useDarkMode';

import ProfileMenu from './ProfileMenu';

interface TopbarProps {
  showMenuIconOnMobile?: boolean;
  onToggleMenu?: () => void;
  showProfileMenu?: boolean;
}

function Topbar({ showMenuIconOnMobile, onToggleMenu, showProfileMenu }: TopbarProps) {
  const [mode, setMode] = useDarkMode();

  // Laptop: Z-index set to 1201 to be above MUI Drawers (default Drawer z-index 1200)
  // We want the Topbar to be above the Drawer during breakpoints md (and up)

  return (
    <Appbar
      className="tw:h-topbar"
      color="inherit"
      sx={(theme) => ({
        zIndex: {
          sm: theme.zIndex.drawer + 1,
        },
      })}
    >
      <Toolbar className="tw:h-full tw:min-h-0">
        {showMenuIconOnMobile && (
          <IconButton
            className="tw:mr-4"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleMenu}
          >
            <MdMenuOpen />
          </IconButton>
        )}

        <TbTruckDelivery className="tw:mr-2 tw:text-3xl" />
        <Typography variant="h6" className="tw:font-semibold">
          ShipNTrack
        </Typography>

        {showProfileMenu && (
          <div className="tw:flex-1 tw:text-right">
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? <DarkModeIcon /> : <SunnyIcon />}
            </IconButton>
            <ProfileMenu />
          </div>
        )}
      </Toolbar>
    </Appbar>
  );
}

export default Topbar;
