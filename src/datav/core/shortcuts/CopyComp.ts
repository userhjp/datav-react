import { KeyCode, Shortcut } from '../models';

export const CopyComp = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.C],
    [KeyCode.Meta, KeyCode.C],
  ],
  handler(context) {
    const engine = context?.engine;
    engine.operation.copeClipboard();
  },
});

export const PasteComp = new Shortcut({
  codes: [
    [KeyCode.Control, KeyCode.V],
    [KeyCode.Meta, KeyCode.V],
  ],
  handler(context) {
    const engine = context?.engine;
    engine.operation.pasteClipboard();
  },
});
