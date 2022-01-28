import { PanelType } from '@/datav/shared';
import { observer } from '@formily/react';
import React, { useEffect, useRef } from 'react';
import { RulerBuilder } from '../../../../../shared/canvas';
import { useScreen, useToolbar, useViewport } from '@/datav/react/hooks';
import { IconWidget } from '../../../IconWidget';
import './index.less';

const guideLine: {
  h: number[];
  v: number[];
} = {
  h: [],
  v: [],
};

const Ruler: React.FC = observer(() => {
  const hRulerWpRef = useRef(null);
  const vRulerWpRef = useRef(null);
  const hRuler = useRef<RulerBuilder | null>(null);
  const vRuler = useRef<RulerBuilder | null>(null);
  const toolbar = useToolbar();
  const screen = useScreen();
  const viewport = useViewport();
  const cw = document.documentElement.clientWidth;

  const toggleGuides = () => {
    if (hRuler.current && vRuler.current) {
      const val = !toolbar.toolbox.referline;
      toolbar.setPanelState({ type: PanelType.referline, value: !toolbar.toolbox.referline });
      hRuler.current.toggleGuide(val);
      vRuler.current.toggleGuide(val);
    }
  };

  useEffect(() => {
    if (hRulerWpRef.current && vRulerWpRef.current) {
      const width = viewport.scrollWidth;
      const height = viewport.scrollHeight;
      const hWidth = Math.max(width, cw);
      if (hRuler.current) {
        hRuler.current.setSize(hWidth, 20, screen.scale);
      } else {
        hRuler.current = new RulerBuilder(hRulerWpRef.current, {
          direction: 'TB',
          width: hWidth,
          scale: screen.scale,
          coorChange: (action, nCoor, oCoor) => {
            if (action === 'add') {
              toolbar.setPanelState({ type: PanelType.referline, value: true });
              guideLine.h.push(nCoor);
            } else if (action === 'update' && nCoor !== oCoor) {
              guideLine.h = guideLine.h.filter((m) => m !== oCoor);
              guideLine.h.push(nCoor);
            } else if (action === 'delete') {
              guideLine.h = guideLine.h.filter((m) => m !== nCoor);
            }
          },
        });

        hRuler.current.setGuideLines(guideLine.h);
      }

      if (vRuler.current) {
        vRuler.current.setSize(height, 20, screen.scale);
      } else {
        vRuler.current = new RulerBuilder(vRulerWpRef.current, {
          direction: 'LR',
          width: height,
          scale: screen.scale,
          coorChange: (action, nCoor, oCoor) => {
            if (action === 'add') {
              guideLine.v.push(nCoor);
            } else if (action === 'update' && nCoor !== oCoor) {
              guideLine.v = guideLine.v.filter((m) => m !== oCoor);
              guideLine.v.push(nCoor);
            } else if (action === 'delete') {
              guideLine.v = guideLine.v.filter((m) => m !== nCoor);
            }
          },
        });
        vRuler.current.setGuideLines(guideLine.v);
      }
    }
  }, [viewport.scrollHeight, viewport.scrollWidth]);

  useEffect(() => {
    if (hRuler.current && vRuler.current) {
      const val = toolbar.toolbox.referline;
      hRuler.current.toggleGuide(val);
      vRuler.current.toggleGuide(val);
    }
  }, [toolbar.toolbox.referline]);

  return (
    <div className="canvas-ruler-wp">
      <div ref={hRulerWpRef} className="ruler-wrapper h-container" style={{ transform: `translateX(-${viewport.scrollX}px)` }} />
      <div
        ref={vRulerWpRef}
        className="ruler-wrapper v-container"
        style={{ transform: `rotate(90deg) translateX(-${viewport.scrollY}px)` }}
      />
      <div title="切换参考线" className="ruler-corner" onClick={toggleGuides}>
        <IconWidget infer={toolbar.toolbox.referline ? 'RulerOn' : 'RulerOff'} />
      </div>
    </div>
  );
});

export default Ruler;
