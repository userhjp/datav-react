import { Engine, CursorStatus, Viewport } from '../models';
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events';
import { calcAutoScrollBasicInfo, IAutoScrollBasicInfo, IPoint, Point, scrollAnimate } from '../../shared';

export const useAutoScrollEffect = (engine: Engine) => {
  let xScroller: IAutoScrollBasicInfo = null;
  let yScroller: IAutoScrollBasicInfo = null;
  let xScrollerAnimationStop = null;
  let yScrollerAnimationStop = null;

  const scrolling = (point: IPoint, viewport: Viewport) => {
    if (engine.cursor.status === CursorStatus.Dragging) {
      xScroller = calcAutoScrollBasicInfo(point, 'x', viewport.rect);
      yScroller = calcAutoScrollBasicInfo(point, 'y', viewport.rect);
      if (xScroller) {
        if (xScrollerAnimationStop) {
          xScrollerAnimationStop();
        }
        xScrollerAnimationStop = scrollAnimate(viewport.scrollContainer, 'x', xScroller.direction, xScroller.speed);
      } else {
        if (xScrollerAnimationStop) {
          xScrollerAnimationStop();
        }
      }
      if (yScroller) {
        if (yScrollerAnimationStop) {
          yScrollerAnimationStop();
        }
        yScrollerAnimationStop = scrollAnimate(viewport.scrollContainer, 'y', yScroller.direction, yScroller.speed);
      } else {
        if (yScrollerAnimationStop) {
          yScrollerAnimationStop();
        }
      }
    }
  };

  engine.subscribeTo(DragStartEvent, () => {
    engine.viewport.takeDragStartSnapshot();
  });

  engine.subscribeTo(DragMoveEvent, (event) => {
    const viewport = engine.viewport;
    const point = new Point(event.data.topClientX, event.data.topClientY);
    scrolling(point, viewport);
  });
  engine.subscribeTo(DragStopEvent, () => {
    xScroller = null;
    yScroller = null;
    if (xScrollerAnimationStop) {
      xScrollerAnimationStop();
    }
    if (yScrollerAnimationStop) {
      yScrollerAnimationStop();
    }
  });
};
