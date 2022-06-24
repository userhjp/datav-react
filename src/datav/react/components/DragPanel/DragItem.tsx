import { useDesigner } from '../../hooks';
import { useDrag } from 'ahooks';
import React, { useRef, useState } from 'react';
import { IWidgetMenuData } from '../../types';

export const DragItem: React.FC<IWidgetMenuData> = (props) => {
  const { name, type, cover } = props;
  const { children, ...dragProp } = props;
  const dragRef = useRef();
  const designer = useDesigner();
  const [dragging, setDragging] = useState<boolean>(false);
  useDrag(dragProp, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(null);
    },
  });

  const domProps = {
    [designer.props?.sourceIdAttrName]: type,
    style: { opacity: dragging ? 0.4 : 1, cursor: 'move' },
    title: '拖拽添加图表',
    className: 'item-warp',
  };

  return (
    <div ref={dragRef} {...domProps}>
      {children ? (
        children
      ) : (
        <>
          <div className="title">{name}</div>
          <div className="cover-img">
            <img src={cover} alt={name} />
          </div>
        </>
      )}
    </div>
  );
};
