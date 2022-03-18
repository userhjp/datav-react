import { CursorDragType, Engine } from '../models';
import { ViewportResizeEvent, ViewportScrollEvent } from '../events';

export const useViewportEffect = (engine: Engine) => {
  engine.subscribeTo(ViewportResizeEvent, (event) => {
    if (engine.viewport.matchViewport(event.data.target)) {
      engine.viewport.digestViewport();
    }
  });
  engine.subscribeTo(ViewportScrollEvent, (event) => {
    if (engine.viewport.matchViewport(event.data.target) && engine.cursor.dragType !== CursorDragType.Screen) {
      engine.viewport.digestViewport();
    }
  });
};
