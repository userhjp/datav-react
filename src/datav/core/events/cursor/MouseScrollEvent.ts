import { ICustomEvent } from '../../../shared';
import { AbstractCursorEvent, ICursorEventOriginData } from './AbstractCursorEvent';

export class MouseScrollEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'mouse:scoll';
  scrollType: 'up' | 'down';
  wheel: WheelEvent & { wheelDelta: number };
  constructor(data: ICursorEventOriginData, e: WheelEvent & { wheelDelta: number }) {
    super(data);
    const wheelDelta = e.wheelDelta || e.detail;
    this.scrollType = wheelDelta > 0 ? 'up' : 'down';
    this.wheel = e;
  }
}
