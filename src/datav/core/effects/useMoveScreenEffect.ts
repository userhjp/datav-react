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

  engine.subscribeTo(DragStartEvent, (e) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    engine.cursor.setDragType(CursorDragType.Screen);
  });

  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine?.viewport) return;
    const el = e.data.target as HTMLElement;
    const x = engine.viewport.scrollX;
    const y = engine.viewport.scrollY;
    const x2 = engine.viewport.scrollHeight - engine.viewport.height;
    const y2 = engine.viewport.scrollWidth - engine.viewport.width;
    console.log(x, y, x2, y2);
  });

  engine.subscribeTo(DragStopEvent, () => {
    engine.cursor.setDragType(CursorDragType.Normal);
  });
};
