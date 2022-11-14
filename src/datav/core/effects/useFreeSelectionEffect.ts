import { DragStopEvent, KeyDownEvent, KeyUpEvent } from '../events';
import { Engine, CursorType } from '../models';
import { calcRectByStartEndPoint, isCrossRectInRect, KeyCode, Point } from '../../shared';

export const useFreeSelectionEffect = (engine: Engine) => {
  engine.subscribeTo(KeyDownEvent, (event) => {
    if (event.data !== KeyCode.Control) return;
    event.preventDefault();
    event.stopPropagation();
    engine.cursor.setType(CursorType.Selection);
  });
  engine.subscribeTo(KeyUpEvent, (event) => {
    if (event.data !== KeyCode.Control) return;
    engine.cursor.setType(CursorType.Normal);
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.type !== CursorType.Selection) return;
    const dragStartPoint = new Point(engine.cursor.dragStartPosition.topClientX, engine.cursor.dragStartPosition.topClientY);
    const dragStartOffsetPoint = engine.viewport.getOffsetPoint(
      new Point(engine.cursor.dragStartPosition.topClientX, engine.cursor.dragStartPosition.topClientY)
    );
    const dragEndOffsetPoint = engine.viewport.getOffsetPoint(
      new Point(engine.cursor.position.topClientX, engine.cursor.position.topClientY)
    );
    if (!engine.viewport.isPointInViewport(dragStartPoint, false)) return;
    const components = engine.operation.components;
    const selectionRect = calcRectByStartEndPoint(
      dragStartOffsetPoint,
      dragEndOffsetPoint,
      engine.viewport.dragScrollXDelta,
      engine.viewport.dragScrollYDelta
    );
    const selectedId: string[] = [];
    components.forEach((node) => {
      const nodeRect = engine.viewport.getValidNodeOffsetRect(node);
      if (nodeRect && isCrossRectInRect(selectionRect, nodeRect)) {
        if (!node.isHide && !node.isLock) {
          selectedId.push(node.id);
        }
      }
    });
    engine.operation.selection.batchSafeSelect(selectedId);
    engine.cursor.setType(CursorType.Normal);
  });
};
