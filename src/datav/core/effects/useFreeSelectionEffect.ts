import { DragStopEvent } from '../events';
import { Engine, CursorType } from '../models';
import { calcRectByStartEndPoint, isCrossRectInRect, Point } from '../../shared';

export const useFreeSelectionEffect = (engine: Engine) => {
  engine.subscribeTo(DragStopEvent, (event) => {
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
      engine.viewport.scrollX,
      engine.viewport.scrollY
    );
    const selectedId: string[] = [];
    components.forEach((node) => {
      const nodeRect = engine.viewport.getValidNodeOffsetRect(node);
      if (nodeRect && isCrossRectInRect(selectionRect, nodeRect)) {
        if (!node.attr.isHide && !node.attr.isLock) {
          selectedId.push(node.id);
        }
      }
    });
    engine.operation.selection.batchSafeSelect(selectedId);
    engine.cursor.setType(CursorType.Normal);
  });
};
