import { useDesigner, useScreen } from '../../../..//hooks';
import { observer } from '@formily/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ToolWidget } from '../../ToolWidget';
import { WidgetDrag } from '../WidgetDrop';
import './index.less';

const Workspace: React.FC = observer(() => {
  const screen = useScreen();
  const designer = useDesigner();
  const domRef = useRef<HTMLDivElement>();

  const style: React.CSSProperties = {
    background: screen?.backgroundImg ? `url(${screen.backgroundImg}) 0% 0% / 100% 100% no-repeat` : screen.backgroundColor || '#0e2a42',
    width: screen.width,
    height: screen.height,
    transform: `scale(${screen.scale})`,
  };

  const canvasNodeAttrName = {
    [designer.props?.canvasNodeAttrName]: 'root',
  };

  const canvasNodeAttrContainerName = {
    [`${designer.props?.canvasNodeAttrName}-container`]: 'root',
  };

  const containerStyle: React.CSSProperties = {
    width: screen.width * screen.scale + 100,
    height: screen.height * screen.scale + 100,
    position: 'absolute',
  };

  useLayoutEffect(() => {
    // 解决初始化时因为动画未完成导致计算画布高宽失败
    requestAnimationFrame(() => {
      domRef.current.style.transition = '0.2s all ease-in-out';
    });
  }, []);

  return (
    <div style={containerStyle} {...canvasNodeAttrContainerName}>
      <div ref={domRef} {...canvasNodeAttrName} className="canvas-panel" style={style}>
        <ToolWidget />
        <WidgetDrag />
      </div>
    </div>
  );
});

export default Workspace;
