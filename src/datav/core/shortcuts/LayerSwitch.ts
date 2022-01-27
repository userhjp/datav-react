import { PanelType } from '@/datav/shared';
import { KeyCode, Shortcut } from '../models';

export const LayerSwitch = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.ArrowLeft],
    [KeyCode.Meta, KeyCode.ArrowLeft],
  ],
  handler(context) {
    const engine = context?.engine;
    if (engine) {
      engine.toolbar.setPanelState({ type: PanelType.layer, value: !engine.toolbar.layer.show });
    }
  },
});
