import { KeyCode, Shortcut } from '../models';

export const DeleteComp = new Shortcut({
  codes: [[KeyCode.Delete]],
  handler(context) {
    const operation = context?.engine.operation;
    if (operation) {
      operation.hover.clear();
      operation.removeCompSchema();
    }
  },
});
