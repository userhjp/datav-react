import { Engine } from '../models/Engine';
import { MouseScrollEvent } from '../events';
import { EventDriver } from '../../shared';
export class MouseScrollDriver extends EventDriver<Engine> {
  request = null;

  onMousewheel = (e: WheelEvent & { wheelDelta: number }) => {
    if (e.ctrlKey) e.preventDefault();
    this.request = requestAnimationFrame(() => {
      cancelAnimationFrame(this.request);
      this.dispatch(
        new MouseScrollEvent(
          {
            clientX: e.clientX,
            clientY: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY,
            target: e.target,
            view: e.view,
          },
          e
        )
      );
    });
  };

  attach() {
    this.addEventListener('mousewheel', this.onMousewheel, {
      mode: 'onlyOne',
      passive: false,
    });
  }

  detach() {
    this.removeEventListener('mousewheel', this.onMousewheel, {
      mode: 'onlyOne',
    });
  }
}
