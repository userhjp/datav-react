import { Engine } from '../models';
import { DvWidgetEvent } from '../events';

export const useWidgetEventEffect = (engine: Engine) => {
  engine.subscribeTo(DvWidgetEvent, (event) => {
    debugger;
  });
};
