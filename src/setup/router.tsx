import { createBrowserRouter, type RouteObject } from 'react-router';

// Protected routes
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';

// Public routes
import PublicLayout from '@layouts/PublicLayout';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
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
  { element: <MainLayout />, children: protectedRoutes },
]);

export default router;
