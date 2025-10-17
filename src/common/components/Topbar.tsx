import Appbar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { TbTruckDelivery } from 'react-icons/tb';

function Topbar() {
  return (
    <Appbar className="tw:h-topbar" color="inherit">
      <Toolbar>
        <TbTruckDelivery className="tw:mr-2 tw:text-3xl" />
        <Typography variant="h6" className="tw:font-semibold">
          ShipNTrack
        </Typography>
      </Toolbar>
    </Appbar>
  );
}

export default Topbar;
