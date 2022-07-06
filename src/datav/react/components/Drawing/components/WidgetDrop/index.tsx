import React, { useRef, useState } from 'react';
import { Observer, observer } from '@formily/react';
import { useCallback, useMemo } from 'react';
import { message } from 'antd';
import { useDrop } from 'ahooks';
import { useOperation, useViewport } from '../../../../hooks';
import { useDesigner, useSelection } from '../../../../hooks';
import { ContextMenu } from '../../../../components';
import { RenderWidget } from '../RenderWidget';
import { createWidgetNode, WidgetNode } from '../../../../../core';
import { IWidgetMenuData } from '../../../../../react/types';
import './index.less';

export const WidgetDrag: React.FC = () => {
  const operation = useOperation();
  const dropRef = useRef();
  const viewPort = useViewport();
  const [isHovering, setIsHovering] = useState(false);

  const addBox = useCallback(
    ({ x = 0, y = 0, name, type, dnConfig }) => {
      const comW = dnConfig.w || 380;
      const comH = dnConfig.h || 220;
      if (!dnConfig) {
        message.success({
          content: '开发中，敬请期待...',
          className: 'dv-message-class',
        });
        return;
      }
      const offset = 60;
      const offsetX = (x - (viewPort.offsetX + offset) + viewPort.scrollX) / viewPort.scale;
      const offsetY = (y - (viewPort.offsetY + offset) + viewPort.scrollY) / viewPort.scale;
      const attrx = Math.round(offsetX - comW / 2);
      const attry = Math.round(offsetY - comH / 2);
      const widgetNode = createWidgetNode({
        w: comW,
        h: comH,
        x: attrx,
        y: attry,
        name,
        type,
        data: dnConfig.data,
        options: dnConfig.defaultConfig,
        ver: dnConfig.version || '1.0',
        events: dnConfig.events,
      });
      operation.addNode(widgetNode);
    },
    [viewPort.scrollX, viewPort.scrollY, viewPort.offsetX, viewPort.offsetY]
  );

  useDrop(dropRef, {
    onDom: (item: IWidgetMenuData, e) => {
      const initOffset = { x: e.pageX, y: e.pageY };
      addBox({ ...item, ...initOffset });
      setIsHovering(false);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <div ref={dropRef} className={`drop-container ${isHovering ? 'putdown' : ''}`}>
      <Observer>
        {() => {
          if (!operation.components.length) return <div />;
          return <>{operation.components.map((item) => <WidgetContainer key={item.id} node={item} />).reverse()}</>;
        }}
      </Observer>
    </div>
  );
};

type WidgetContainerProps = {
  node: WidgetNode;
};

export const WidgetContainer: React.FC<WidgetContainerProps> = observer(({ node }) => {
  const { attr, id, isLock, isHide } = node;
  const ref = useRef<HTMLDivElement>();
  const selection = useSelection();
  const designer = useDesigner();
  const selected = selection.has(id);
  const transformStyle: React.CSSProperties = useMemo(() => {
    return {
      left: 0,
      top: 0,
      width: attr.w,
      height: attr.h,
      transform: `translate(${attr.x}px, ${attr.y}px)`,
      zIndex: selected ? 2 : 'auto',
    };
  }, [attr.w, attr.h, attr.x, attr.y, selected]);
  const handlerStyle = useMemo(() => {
    return { cursor: isLock || isHide ? 'default' : 'move', transform: `rotate(${attr.deg || 0}deg)` };
  }, [attr.deg, isLock, isHide]);

  const comStyle = useMemo(() => {
    return { opacity: attr.opacity };
  }, [attr.opacity]);

  return (
    <ContextMenu currentId={id}>
      <div ref={ref} style={transformStyle} className="widget-container">
        <div className="transform-handler" style={handlerStyle}>
          <div className="widget-com" style={comStyle}>
            <RenderWidget node={node} />
            <div className="wrapper-event-disable" {...{ [designer.props.nodeIdAttrName]: id }} />
          </div>
        </div>
      </div>
    </ContextMenu>
  );
});
