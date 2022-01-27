import { ICustomEvent } from '@/datav/shared';
import { AbstractViewportEvent } from './AbstractViewportEvent';

export class ViewportScrollEvent extends AbstractViewportEvent implements ICustomEvent {
  type = 'viewport:scroll';
}
