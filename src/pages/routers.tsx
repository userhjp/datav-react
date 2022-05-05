import React from 'react';
import { Navigate, RouteObject } from 'react-router';

const Example = React.lazy(() => import('@/pages/Home/Example'));
const Project = React.lazy(() => import('@/pages/Home/Project'));
const Screen = React.lazy(() => import('@/pages/Screen'));

const HomeRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="example" />,
  },
  {
    path: 'example',
    element: <Example />,
  },
  {
    path: 'project',
    element: <Project />,
  },
  {
    path: 'screen',
    element: <Screen />,
  },
];

export default HomeRoutes;
