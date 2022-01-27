import { PanelType } from '@/datav/shared';
import { KeyCode, Shortcut } from '../models';

export const SettingsSwitch = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.ArrowRight],
    [KeyCode.Meta, KeyCode.ArrowRight],
  ],
  handler(context) {
    const engine = context?.engine;
    if (engine) {
      engine.toolbar.setPanelState({ type: PanelType.config, value: !engine.toolbar.config.show });
    }
  },
});
