import { Viewport as ViewportTyp } from '../../../../../core';
import { useDesigner, useViewport } from '../../../../hooks';
import React, { useEffect, useRef } from 'react';
import { FreeSelection } from '../../ToolWidget/FreeSelection';
import Ruler from '../Ruler';
import Workspace from '../Workspace';
import './index.less';

const Viewport: React.FC = () => {
  const ref = useRef<HTMLDivElement>();
  const designer = useDesigner();
  const viewport = useViewport();
  const viewportRef = useRef<ViewportTyp>();

  useEffect(() => {
    if (!viewport) return null;
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount();
    }
    viewport.onMount(ref.current, window);
    viewportRef.current = viewport;
    return () => {
      viewport.onUnmount();
    };
  }, [viewport]);

  useEffect(() => {
    if (ref.current) {
      designer.createViewport(ref.current);
    }
  }, [ref.current]);

  return (
    <div style={{ flex: 1 }}>
      <div className="canvas-panel-wrap" ref={ref}>
        <Ruler />
        <FreeSelection />
        <Workspace />
      </div>
    </div>
  );
};

export default Viewport;
