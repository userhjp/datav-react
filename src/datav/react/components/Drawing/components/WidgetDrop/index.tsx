import React, { useRef, useState } from 'react';
import { Observer, observer } from '@formily/react';
import { useCallback, useMemo } from 'react';
import { message } from 'antd';
import { useDrop } from 'ahooks';
import { useOperation, useViewport } from '@/datav/react/hooks';
import { ComType } from '@/datav/interface';
import { useDesigner, useSelection } from '@/datav/react/hooks';
import { ContextMenu } from '@/datav/react/components';
import { GlobalRegistry } from '@/datav/core/registry';
import { RenderWidget } from '../RenderWidget';
import './index.less';

export const WidgetDrag: React.FC = () => {
  const operation = useOperation();
  const dropRef = useRef();
  const viewPort = useViewport();
  const [isHovering, setIsHovering] = useState(false);

  const addBox = useCallback(
    ({ x = 0, y = 0, name, type }) => {
      const com = GlobalRegistry.getDesignerConfig(type);
      if (!com) {
        message.info('开发中，敬请期待...');
        return;
      }
      const offset = 60;
      const offsetX = (x - (viewPort.offsetX + offset) + viewPort.scrollX) / viewPort.scale;
      const offsetY = (y - (viewPort.offsetY + offset) + viewPort.scrollY) / viewPort.scale;
      const attrx = Math.round(offsetX - com.w / 2);
      const attry = Math.round(offsetY - com.h / 2);
      operation.addCom({
        w: com.w,
        h: com.h,
        x: attrx,
        y: attry,
        name,
        type,
        data: com.data,
        ver: com.attr.version || '1.0',
        fieldsDes: com.fields,
      });
    },
    [viewPort.scrollX, viewPort.scrollY, viewPort.offsetX, viewPort.offsetY]
  );

  useDrop(dropRef, {
    onDom: (item: { id: string; name: string; type: string }, e) => {
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
          return <>{operation.components.map((item) => <WidgetContainer key={item.id} comp={item} />).reverse()}</>;
        }}
      </Observer>
    </div>
  );
};

type WidgetContainerProps = {
  comp: ComType;
};

export const WidgetContainer: React.FC<WidgetContainerProps> = observer(({ comp }) => {
  const { attr, id } = comp;
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
    return { cursor: 'move', transform: `rotate(${attr.deg || 0}deg)` };
  }, [attr.deg]);

  const comStyle = useMemo(() => {
    return { opacity: attr.opacity };
  }, [attr.opacity]);

  return (
    <ContextMenu currentId={id}>
      <div ref={ref} style={transformStyle} className="widget-container">
        <div className="transform-handler" style={handlerStyle}>
          <div className="widget-com" style={comStyle}>
            <RenderWidget comp={comp} />
            <div className="wrapper-event-disable" {...{ [designer.props.nodeIdAttrName]: id }} />
          </div>
        </div>
      </div>
    </ContextMenu>
  );
});