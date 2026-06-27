/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { RequireAuth, LoginAuth } from '@features/auth';

// Protected routes
// import MainLayout from '@layouts/MainLayout';
const MainLayout = lazy(() => import('@layouts/MainLayout'));
const Home = lazy(() => import('@pages/Home'));
const UserManagement = lazy(() => import('@pages/UserManagement'));
import NotFound from '@pages/NotFound';

// Public routes
import PublicLayout from '@layouts/PublicLayout';
import Login from '@pages/Login';

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users',
    element: <UserManagement />,
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
  {
    element: <LoginAuth />,
    children: [{ element: <PublicLayout />, children: publicRoutes }],
  },
  {
    element: <RequireAuth />,
    children: [{ element: <MainLayout />, children: protectedRoutes }],
  },
]);

export default router;
