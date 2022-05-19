import React, { useEffect } from 'react';
import { Toolbox } from '../Toolbox';
import KeyPress from './components/KeyPress';
import Viewport from './components/Viewport';
import ScreenSelectd from './components/ScreenSelectd';
import { useGlobalSource } from '../../hooks/useGlobalSource';
import './index.less';

export const Drawing: React.FC = () => {
  useGlobalSource();
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
