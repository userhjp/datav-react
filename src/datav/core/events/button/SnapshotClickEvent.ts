import { ICustomEvent } from '@/datav/shared';
import { AbstractButtonEvent } from './AbstractButtonEvent';

export class SnapshotClickEvent extends AbstractButtonEvent implements ICustomEvent {
  type = 'button:snapshot';
}
