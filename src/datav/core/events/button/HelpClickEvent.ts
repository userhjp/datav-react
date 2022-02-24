import { ICustomEvent } from '../../../shared';
import { AbstractButtonEvent } from './AbstractButtonEvent';

export class HelpClickEvent extends AbstractButtonEvent implements ICustomEvent {
  type = 'button:help';
}
