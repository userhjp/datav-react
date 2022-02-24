import { ICustomEvent } from '../../../shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragStartEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:start';
}
