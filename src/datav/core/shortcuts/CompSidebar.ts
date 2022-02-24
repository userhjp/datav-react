import { PanelType } from '../../shared';
import { KeyCode, Shortcut } from '../models';

export const CompSidebar = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.ArrowUp],
    [KeyCode.Meta, KeyCode.ArrowUp],
  ],
  handler(context) {
    const engine = context?.engine;
    if (engine) {
      engine.toolbar.setPanelState({ type: PanelType.components, value: !engine.toolbar.components.show });
    }
  },
});
