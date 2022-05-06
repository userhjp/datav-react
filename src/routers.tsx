import React from 'react';
import { Navigate, RouteObject } from 'react-router';
import VisualLayout from './layouts/VisualLayout';
import homeRoutes from './pages/routers';

const Screen = React.lazy(() => import('@/pages/Screen'));
const Design = React.lazy(() => import('@/pages/Design'));

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="visual" />,
  },
  {
    path: '/visual',
    element: <VisualLayout />,
    children: homeRoutes,
  },
  {
    path: '/design',
    element: <Design />,
  },
  {
    path: '/screen',
    element: <Screen />,
  },
];

export default routes;
