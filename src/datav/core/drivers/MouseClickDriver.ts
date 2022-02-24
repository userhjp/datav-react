import { Engine } from '../models/Engine';
import { MouseClickEvent, MouseDoubleClickEvent } from '../events';
import { EventDriver } from '../../shared';

export class MouseClickDriver extends EventDriver<Engine> {
  onMouseClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest(`*[${this.engine.props.clickStopPropagationAttrName}]`)) {
      return;
    }
    this.dispatch(
      new MouseClickEvent({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      })
    );
  };

  onMouseDoubleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest(`*[${this.engine.props.clickStopPropagationAttrName}]`)) {
      return;
    }
    this.dispatch(
      new MouseDoubleClickEvent({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      })
    );
  };

  attach() {
    this.addEventListener('click', this.onMouseClick, {
      mode: 'onlyParent',
    });
    this.addEventListener('dblclick', this.onMouseDoubleClick, {
      mode: 'onlyParent',
    });
  }

  detach() {
    this.removeEventListener('click', this.onMouseClick, {
      mode: 'onlyParent',
    });
    this.removeEventListener('dblclick', this.onMouseDoubleClick, {
      mode: 'onlyParent',
    });
  }
}
