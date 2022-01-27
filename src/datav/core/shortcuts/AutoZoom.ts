import { KeyCode, Shortcut } from '../models';

export const AutoZoom = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.ArrowDown],
    [KeyCode.Meta, KeyCode.ArrowDown],
  ],
  handler(context) {
    const engine = context?.engine;
    if (engine) {
      engine.viewport.autoScale();
    }
  },
});
