import { Outlet } from 'react-router';
import DashboardLayout from '@components/DashboardLayout';

import type { NavigationItems } from '@interfaces/navigation.types';
import useLocalStorage from '@hooks/useLocalStorage';

import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { FaHome } from 'react-icons/fa'; // Example import for icons

const navigationItems: NavigationItems = [
  { title: 'Home', path: '/', icon: <FaHome /> },
  { title: 'User Management', path: '/users', icon: <PeopleOutlinedIcon /> },
  // {
  //   title: 'Shipments',
  //   children: [
  //     { title: 'All Shipments', path: '/shipments' },
  //     { title: 'Create Shipment', path: '/shipments/create' },
  //     { title: 'Shipment Templates', path: '/shipments/templates' },
  //     { title: 'Track Shipments', path: '/shipments/track' },
  //   ],
  // },
  // {
  //   title: 'Integrations',
  //   children: [
  //     { title: 'EDI', path: '/integrations/edi' },
  //     { title: 'API', path: '/integrations/api' },
  //   ],
  // },
];

function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage({
    key: 'user-sidebar-settings',
    initialValue: false,
  });

  return (
    <DashboardLayout
      defaultSidebarCollapsed={isSidebarCollapsed}
      onChangeSidebarCollapsed={(collapsed) => setIsSidebarCollapsed(collapsed)}
      navigationItems={navigationItems}
      showProfileMenu
    >
      <Outlet />
    </DashboardLayout>
  );
}

export default MainLayout;
