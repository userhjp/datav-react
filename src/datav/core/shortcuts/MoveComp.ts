import { KeyCode, Shortcut } from '../models';

export const MoveCompUp = new Shortcut({
  codes: [KeyCode.ArrowUp],
  handler: (context) => {
    const engine = context?.engine;
    if (engine) {
      engine.operation.moveTo('ArrowUp');
    }
  },
});

export const MoveCompRight = new Shortcut({
  codes: [KeyCode.ArrowRight],
  handler: (context) => {
    const engine = context?.engine;
    if (engine) {
      engine.operation.moveTo('ArrowRight');
    }
  },
});

export const MoveCompDown = new Shortcut({
  codes: [KeyCode.ArrowDown],
  handler: (context) => {
    const engine = context?.engine;
    if (engine) {
      engine.operation.moveTo('ArrowDown');
    }
  },
});

export const MoveCompLeft = new Shortcut({
  codes: [KeyCode.ArrowLeft],
  handler: (context) => {
    const engine = context?.engine;
    if (engine) {
      engine.operation.moveTo('ArrowLeft');
    }
  },
});

export const MoveScreen = new Shortcut({
  codes: [KeyCode.Control, KeyCode.Space],
  handler: (context) => {},
});
