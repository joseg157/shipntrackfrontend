import { Outlet } from 'react-router';
import Topbar from '@components/Topbar';

function PublicLayout() {
  return (
    <div className="tw:flex tw:h-dvh">
      <Topbar />

      <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col">
        {/* Fixed Placement: Make sure the contents is placed below the topbar component */}
        <div className="tw:h-topbar" />

        <div className="tw:flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
