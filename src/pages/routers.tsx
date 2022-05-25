import React from 'react';
import { Navigate, RouteObject } from 'react-router';

const Example = React.lazy(() => import('@/pages/Home/Example'));
const Project = React.lazy(() => import('@/pages/Home/Project'));

const HomeRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="project" />,
  },
  {
    path: 'project',
    element: <Project />,
  },
  {
    path: 'example',
    element: <Example />,
  },
];

export default HomeRoutes;
