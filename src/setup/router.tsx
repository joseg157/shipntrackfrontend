import { createBrowserRouter, type RouteObject } from 'react-router';

import Home from '@pages/Home';

// Public routes
import PublicLayout from '@layouts/PublicLayout';
import Login from '@pages/Login';

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter([
  { element: <PublicLayout />, children: publicRoutes },
  ...protectedRoutes,
]);

export default router;
