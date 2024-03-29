import React from 'react';
import { Navigate, RouteObject } from 'react-router';
import VisualLayout from './layouts/VisualLayout';
import homeRoutes from './pages/routers';

const Screen = React.lazy(() => import('@/pages/Screen'));
const Design = React.lazy(() => import('@/pages/Design'));

const routes: RouteObject[] = [
  {
    index: true,
    path: '/',
    element: <Navigate to="visual" />,
  },
  {
    path: '/visual',
    element: <VisualLayout />,
    children: homeRoutes,
  },
  {
    path: '/design/:id',
    element: <Design />,
  },
  {
    path: '/screen/:id',
    element: <Screen />,
  },
];

export default routes;
