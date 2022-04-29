import React from 'react';
import { Toolbox } from '../Toolbox';
import KeyPress from './components/KeyPress';
import Viewport from './components/Viewport';
import ScreenSelectd from './components/ScreenSelectd';
import './index.less';

export const Drawing: React.FC = () => {
  return (
    <div className="canvas-main">
      <Toolbox />
      <Viewport />
      <div className="drawing-bottom">
        <KeyPress />
        <ScreenSelectd />
      </div>
    </div>
  );
};
