import { CursorDragType, Engine, WidgetNode } from '../models';
import { DragStartEvent, DragMoveEvent, DragStopEvent, ViewportScrollEvent } from '../events';
import { CursorType } from '../models/Cursor';
import { action } from '@formily/reactive';

/** 位置移动 */
export const useMoveNodeEffect = (engine: Engine) => {
  let status: { x: number; y: number; node: WidgetNode }[] = null;
  let node: WidgetNode;
  let currentDragMove: DragStartEvent = null;

  const moveComponent = () => {
    if (!currentDragMove) return;
    action(() => {
      status.forEach((f) => {
        const viewport = engine.viewport;
        const startPoint = engine.cursor.dragStartPosition;
        const clientX = currentDragMove.data.clientX - startPoint.clientX + viewport.dragScrollXDelta;
        const clientY = currentDragMove.data.clientY - startPoint.clientY + viewport.dragScrollYDelta;
        const attrX = f.x + Math.round(clientX / viewport.scale / viewport.grid) * viewport.grid;
        const attrY = f.y + Math.round(clientY / viewport.scale / viewport.grid) * viewport.grid;
        f.node.attr.x = attrX - (attrX % viewport.grid);
        f.node.attr.y = attrY - (attrY % viewport.grid);
      });
    });
  };

  engine.subscribeTo(DragStartEvent, (e) => {
    if (!engine?.viewport || engine.cursor.type !== CursorType.Normal) return;
    const el = e.data.target as HTMLElement;
    if (el?.closest(`*[${engine.props.nodeIdAttrName}]`)) {
      const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
      node = engine.operation.findById(nodeId);
      if (node.attr.isHide || node.attr.isLock) return;
      status = [];
      engine.cursor.setDragType(CursorDragType.Translate);
      if (engine.operation.selection.length > 1) {
        engine.operation.selection.selected.forEach((f) => {
          node = engine.operation.findById(f);
          status.push({
            x: node.attr.x,
            y: node.attr.y,
            node,
          });
        });
      } else {
        status.push({
          x: node.attr.x,
          y: node.attr.y,
          node,
        });
      }
    }
  });
  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine?.viewport) return;
    if (!status) return;
    currentDragMove = e;
    moveComponent();
  });

  /** 容器时滚动也需要更新组件位置 */
  engine.subscribeTo(ViewportScrollEvent, () => {
    currentDragMove && moveComponent();
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return;
    status = null;
    node = null;
    currentDragMove = null;
    engine.cursor.setDragType(CursorDragType.Normal);
  });
};
