import { useDesigner } from '../../../hooks';
import { useDrag } from 'ahooks';
import React, { useRef, useState } from 'react';
export interface DragItemProps {
  id: string | number;
  cover: string;
  name: string;
  type: string;
}

export const DragItem: React.FC<DragItemProps> = (props) => {
  const { id, name, type, cover } = props;
  const dragRef = useRef();
  const designer = useDesigner();
  const [dragging, setDragging] = useState<boolean>(false);
  useDrag({ id, name, type }, dragRef, {
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
    key: id,
  };

  return (
    <div ref={dragRef} {...domProps}>
      <div className="title">{name}</div>
      <div className="cover-img">
        <img src={cover} alt={name} />
      </div>
    </div>
  );
};
