import React from 'react';
import { Navigate, RouteObject } from 'react-router';
import VisualLayout from './layouts/VisualLayout';
import HomeRoutes from './pages/routers';

const Screen = React.lazy(() => import('@/pages/Screen'));

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="visual" />,
  },
  {
    path: '/visual',
    element: <VisualLayout />,
    children: HomeRoutes,
  },
  {
    path: '/passport',
    element: <Screen />,
  },
];

export default routes;
