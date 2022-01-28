import { useDesigner, useScreen } from '@/datav/react/hooks';
import { observer } from '@formily/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ToolWidget } from '../../ToolWidget';
import { Comps } from '../Comps';
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
    transform: `scale(${screenProps.scale})`,
    backgroundColor: screenProps.backgroundColor,
  };

  const canvasNodeAttrName = {
    [designer.props?.canvasNodeAttrName]: 'root',
  };

  const containerStyle: React.CSSProperties = {
    width: screenProps.width * screenProps.scale + 100,
    height: screenProps.height * screenProps.scale + 100,
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
        <Comps />
      </div>
    </div>
  );
});

export default Workspace;
