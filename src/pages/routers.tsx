import React from 'react';
import { Navigate, RouteObject } from 'react-router';
const lazy = React.lazy;

/**
 * 模拟延迟时间
 * @param time 时间
 * @returns
 */
export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Example = lazy(() => import('@/pages/Home/Project'));
const Project = lazy(() => import('@/pages/Home/Project'));
const Screen = lazy(() => import('@/pages/Screen'));

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
