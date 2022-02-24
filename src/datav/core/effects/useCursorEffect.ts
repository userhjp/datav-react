import { Engine, CursorStatus } from '../models';
import { MouseMoveEvent, DragStartEvent, DragMoveEvent, DragStopEvent } from '../events';
import { requestIdle } from '../../shared';

export const useCursorEffect = (engine: Engine) => {
  engine.subscribeTo(MouseMoveEvent, (event) => {
    engine.cursor.setStatus(
      engine.cursor.status === CursorStatus.Dragging || engine.cursor.status === CursorStatus.DragStart
        ? engine.cursor.status
        : CursorStatus.Normal
    );
    engine.cursor.setPosition(event.data);
  });
  engine.subscribeTo(DragStartEvent, (event) => {
    engine.cursor.setStatus(CursorStatus.DragStart);
    engine.cursor.setDragStartPosition(event.data);
  });
  let cleanStatusRequest = null;
  engine.subscribeTo(DragMoveEvent, () => {
    engine.cursor.setStatus(CursorStatus.Dragging);
    clearTimeout(cleanStatusRequest);
    cleanStatusRequest = setTimeout(() => {
      engine.cursor.setStatus(CursorStatus.Normal);
    }, 1000);
  });
  engine.subscribeTo(DragStopEvent, (event) => {
    clearTimeout(cleanStatusRequest);
    engine.cursor.setStatus(CursorStatus.DragStop);
    engine.cursor.setDragEndPosition(event.data);
    requestIdle(() => {
      engine.cursor.setStatus(CursorStatus.Normal);
    });
  });
  engine.subscribeTo(MouseMoveEvent, (event) => {
    const operation = engine.operation;
    if (engine.cursor.status !== CursorStatus.Normal) {
      return;
    }
    const target = event.data.target as HTMLElement;
    const el = target?.closest?.(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}],
      *[${engine.props.nodeRotateHanderAttrName}],
      *[${engine.props.nodeResizeHandlerAttrName}]
    `);
    if (!el?.getAttribute) {
      operation.hover.clear();
      return;
    }
    const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
    const outlineNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
    const rotateNodeId = el.getAttribute(engine.props.nodeRotateHanderAttrName);
    const ResizeNodeId = el.getAttribute(engine.props.nodeResizeHandlerAttrName);
    const id = nodeId || outlineNodeId || rotateNodeId || ResizeNodeId;
    if (operation.hover.node?.id === id) return;
    const node = operation.findById(id);
    if (node) {
      operation.hover.setHover(node);
    } else {
      operation.hover.clear();
    }
  });
};
