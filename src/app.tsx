import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import appRoutes from './routers';
import { Loading } from './components';
import './app.less';

const App: React.FC = () => {
  const element = useRoutes(appRoutes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};
const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
