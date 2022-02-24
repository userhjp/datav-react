import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './examples/main';
import './app.less';

const App: React.FC = () => {
  return <Main />;
};

ReactDOM.render(<App />, document.getElementById('root'));
