import { useDesigner } from '../../hooks';
import { useDrag } from 'ahooks';
import React, { useRef, useState } from 'react';
import { IWidgetMenuData } from '../../types';
import { message } from 'antd';

export const DragItem: React.FC<IWidgetMenuData> = (props) => {
  const { name, type, cover, dnConfig } = props;
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
    title: name,
    className: 'item-warp',
  };

  const onAdd = () => {
    const node = designer.operation.createNode({ x: null, y: null, name, type, dnConfig });
    if (!node) {
      message.success({
        content: '开发中，敬请期待...',
        className: 'dv-message-class',
      });
      return null;
    }
    designer.operation.addNode(node);
  };

  return (
    <div ref={dragRef} {...domProps} onClick={onAdd}>
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
