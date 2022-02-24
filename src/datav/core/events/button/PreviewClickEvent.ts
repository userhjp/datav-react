import { ICustomEvent } from '../../../shared';
import { AbstractButtonEvent } from './AbstractButtonEvent';

export class PreviewClickEvent extends AbstractButtonEvent implements ICustomEvent {
  type = 'button:preview';
}
