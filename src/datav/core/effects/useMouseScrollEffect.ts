import { CursorDragType, Engine } from '../models';
import { MouseScrollEvent } from '../events';

export const useMouseScrollEffect = (engine: Engine) => {
  engine.subscribeTo(MouseScrollEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Normal) return;
    if (event.wheel.ctrlKey) {
      if (event.scrollType === 'up') {
        engine.screen.setScale(engine.screen.scale + 0.1);
      } else {
        engine.screen.setScale(engine.screen.scale - 0.1);
      }
    }
  });
};
