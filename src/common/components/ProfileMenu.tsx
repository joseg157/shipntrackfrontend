import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { IoPersonCircleOutline } from 'react-icons/io5';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const profileMenuOptions = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Profile',
    path: '/profile',
  },
];

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path?: string) => () => {
    if (path && path !== location.pathname) navigate(path); // Navigate to the path if it's not the current path
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    // Log out api call
  };

  return (
    <>
      <IconButton
        aria-label="account"
        onClick={handleOpen}
        aria-controls={isOpen ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
      >
        <IoPersonCircleOutline className="tw:text-3xl" />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          className: 'tw:w-28 tw:lg:w-32',
        }}
      >
        {profileMenuOptions.map(({ label, path }) => (
          <MenuItem key={label} onClick={handleNavigate(path)} disabled={!path}>
            {label}
          </MenuItem>
        ))}

        <div className="tw:border-0 tw:border-t tw:border-solid tw:border-neutral-400" />
        <MenuItem className="tw:text-red-400" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;
