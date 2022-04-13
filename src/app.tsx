import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './examples/main';
import './app.less';

const App: React.FC = () => {
  return <Main />;
};
const root = createRoot(document.getElementById('root'));
root.render(<App />);
