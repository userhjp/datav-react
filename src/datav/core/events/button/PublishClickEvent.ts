import { ICustomEvent } from '@/datav/shared';
import { AbstractButtonEvent } from './AbstractButtonEvent';

export class PublishClickEvent extends AbstractButtonEvent implements ICustomEvent {
  type = 'button:publish';
}
