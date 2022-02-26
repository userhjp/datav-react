import { ICustomEvent } from '../../../shared';
import { AbstractWidgetEvent } from './AbstractWidgetEvent';

export class DvWidgetEvent extends AbstractWidgetEvent implements ICustomEvent {
  type = 'dv:widget';
}
