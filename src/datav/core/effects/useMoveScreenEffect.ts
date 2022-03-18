import { CursorDragType, CursorType, Engine, KeyCode } from '../models';
import { DragMoveEvent, DragStartEvent, DragStopEvent, KeyDownEvent, KeyUpEvent } from '../events';

export const useMoveScreenEffect = (engine: Engine) => {
  let isMove = false;
  const changeStyle = () => {
    engine.viewport.viewportElement.style.cursor = isMove ? 'grab' : 'default';
    const el = engine.viewport.contentWindow?.document?.body.querySelector(`*[${engine.props.canvasNodeAttrName}]`) as HTMLDivElement;
    if (el) {
      el.style.pointerEvents = isMove ? 'none' : 'auto';
    }
  };

  engine.subscribeTo(KeyDownEvent, (event) => {
    if (event.data !== KeyCode.Space) return;
    if (isMove || engine.cursor.dragType !== CursorDragType.Normal) return;
    isMove = true;
    changeStyle();
  });
  engine.subscribeTo(KeyUpEvent, (event) => {
    if (event.data !== KeyCode.Space) return;
    isMove = false;
    changeStyle();
  });

  engine.subscribeTo(DragStartEvent, () => {
    if (engine.cursor.type !== CursorType.Normal || !isMove) return;
    engine.cursor.setDragType(CursorDragType.Screen);
  });

  engine.subscribeTo(DragMoveEvent, (e) => {
    if (engine.cursor.dragType !== CursorDragType.Screen) return;
    const viewport = engine.viewport;
    const startPoint = engine.cursor.dragStartPosition;
    const startScroll = engine.cursor.dragStartScrollOffset;
    const clientX = startPoint.clientX - e.data.clientX + startScroll.scrollX;
    const clientY = startPoint.clientY - e.data.clientY + startScroll.scrollY;
    const element = viewport.scrollContainer;
    if (clientX <= 0) {
      element.scrollLeft = 0;
    } else if (clientX >= element.scrollWidth) {
      element.scrollLeft = element.scrollWidth;
    } else {
      element.scrollLeft = clientX;
    }
    if (clientY <= 0) {
      element.scrollTop = 0;
    } else if (clientY >= element.scrollHeight) {
      element.scrollTop = element.scrollHeight;
    } else {
      element.scrollTop = clientY;
    }
    engine.viewport.digestViewport();
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.dragType !== CursorDragType.Screen) return;
    engine.cursor.setDragType(CursorDragType.Normal);
    isMove = false;
  });
};
