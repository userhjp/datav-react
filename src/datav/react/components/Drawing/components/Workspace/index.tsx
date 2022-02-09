import { useDesigner, useScreen } from '@/datav/react/hooks';
import { observer } from '@formily/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ToolWidget } from '../../ToolWidget';
import { WidgetDrag } from '../WidgetDrop';
import './index.less';

const Workspace: React.FC = observer(() => {
  const screen = useScreen();
  const designer = useDesigner();
  const screenProps = screen.props;
  const domRef = useRef<HTMLDivElement>();

  const style: React.CSSProperties = {
    background: screenProps?.backgroundImg ? `url(${screenProps.backgroundImg})` : 'none',
    width: screenProps.width,
    height: screenProps.height,
    transform: `scale(${screen.scale})`,
    backgroundColor: screenProps.backgroundColor,
  };

  const canvasNodeAttrName = {
    [designer.props?.canvasNodeAttrName]: 'root',
  };

  const containerStyle: React.CSSProperties = {
    width: screenProps.width * screen.scale + 100,
    height: screenProps.height * screen.scale + 100,
    position: 'absolute',
  };

  useLayoutEffect(() => {
    // 解决初始化时因为动画未完成导致计算画布高宽失败
    requestAnimationFrame(() => {
      domRef.current.style.transition = '0.2s all ease-in-out';
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div ref={domRef} {...canvasNodeAttrName} className="canvas-panel" style={style}>
        <ToolWidget />
        <WidgetDrag />
      </div>
    </div>
  );
});

export default Workspace;
