import React, { useRef, useState } from 'react';
import { Observer, observer } from '@formily/react';
import { useCallback, useMemo } from 'react';
import { message } from 'antd';
import { useDrop } from 'ahooks';
import { getComConfig, Widget } from '@/datav/react/widgets';
import { useOperation, useViewport } from '@/datav/react/hooks';
import { ComType } from '@/datav/interface';
import { useDesigner, useSelection } from '@/datav/react/hooks';
import { ContextMenu } from '@/datav/react/components';
import './index.less';

export const Comps: React.FC = () => {
  const operation = useOperation();
  const dropRef = useRef();
  const viewPort = useViewport();
  const [isHovering, setIsHovering] = useState(false);

  const addBox = useCallback(
    ({ x = 0, y = 0, name, type }) => {
      const com = getComConfig(type);
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
          return <>{operation.components.map((item) => <WidgetDrag key={item.id} comp={item} />).reverse()}</>;
        }}
      </Observer>
    </div>
  );
};

type WidgetDragProps = {
  comp: ComType;
};

export const WidgetDrag: React.FC<WidgetDragProps> = observer(({ comp }) => {
  const attr = { ...comp.attr };
  const ref = useRef<HTMLDivElement>();
  const selection = useSelection();
  const designer = useDesigner();
  const selected = selection.has(comp.id);

  const transformStyle: React.CSSProperties = useMemo(() => {
    return {
      left: 0,
      top: 0,
      width: attr.w,
      height: attr.h,
      transform: `translate(${attr.x}px, ${attr.y}px)`,
      zIndex: selected ? 2 : 'auto',
    };
  }, [attr]);

  const handlerStyle = useMemo(() => {
    return { cursor: 'move', transform: `rotate(${attr.deg || 0}deg)` };
  }, [attr]);

  const comStyle = useMemo(() => {
    return { opacity: attr.opacity };
  }, [attr]);

  return (
    <ContextMenu currentId={comp.id}>
      <div ref={ref} {...{ [designer.props.nodeIdAttrName]: comp.id, style: transformStyle }} className="widget-container">
        <div className="transform-handler" style={handlerStyle}>
          <div className="widget-com" style={comStyle}>
            <Widget comp={comp} />
            <div
              className="wrapper-event-disable"
              {...{ [designer.props.nodeIdAttrName]: comp.id }}
              onMouseEnter={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
    </ContextMenu>
  );
});
