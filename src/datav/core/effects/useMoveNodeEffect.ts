import { Engine } from '../models';
import { DragStartEvent, DragMoveEvent, DragStopEvent, ViewportScrollEvent } from '../events';
import { ComType } from '@/datav/react/interface';
import { CursorType } from '../index';

/** 位置移动 */
export const useMoveNodeEffect = (engine: Engine) => {
  let status = null;
  let startX = 0;
  let startY = 0;
  let node: ComType;
  let currentDragMove: DragStartEvent = null;

  const moveComponent = (e: DragStartEvent) => {
    const viewport = engine.viewport;
    const startPoint = engine.cursor.dragStartPosition;
    const startScroll = engine.cursor.dragStartScrollOffset;
    const scrollX = viewport.scrollX - startScroll.scrollX;
    const scrollY = viewport.scrollY - startScroll.scrollY;
    const clientX = e.data.clientX - startPoint.clientX + scrollX;
    const clientY = e.data.clientY - startPoint.clientY + scrollY;
    const attrX = startX + Math.round(clientX / viewport.scale / viewport.grid) * viewport.grid;
    const attrY = startY + Math.round(clientY / viewport.scale / viewport.grid) * viewport.grid;
    node.attr.x = attrX - (attrX % viewport.grid);
    node.attr.y = attrY - (attrY % viewport.grid);
  };

  engine.subscribeTo(DragStartEvent, (e) => {
    if (!engine?.viewport || engine.cursor.type === CursorType.Selection) return;
    const el = e.data.target as HTMLElement;
    if (el?.closest(`*[${engine.props.nodeIdAttrName}]`)) {
      const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
      node = engine.operation.findById(nodeId);
      status = nodeId;
      startX = node.attr.x;
      startY = node.attr.y;
    }
  });
  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine?.viewport) return;
    if (!status) return;
    currentDragMove = e;
    moveComponent(currentDragMove);
  });

  /** 容器时滚动也需要更新组件位置 */
  engine.subscribeTo(ViewportScrollEvent, () => {
    currentDragMove && moveComponent(currentDragMove);
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return;
    status = null;
    node = null;
    currentDragMove = null;
  });
};
