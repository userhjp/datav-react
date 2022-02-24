import { ICustomEvent } from '../../../shared';
import { AbstractButtonEvent } from './AbstractButtonEvent';

export class SnapshotClickEvent extends AbstractButtonEvent implements ICustomEvent {
  type = 'button:snapshot';
}
