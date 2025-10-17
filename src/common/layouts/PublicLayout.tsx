import { Outlet } from 'react-router';
import Topbar from '@components/Topbar';

function PublicLayout() {
  return (
    <div>
      <Topbar />
      <div className="tw:h-topbar" />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
