import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import appRoutes from './routers';
import { Loading } from './components';
import { Main } from './examples/main';
import './app.less';

const App: React.FC = () => {
  const element = useRoutes(appRoutes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
  // return <Main />;
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
