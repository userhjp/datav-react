import {
  DragDropDriver,
  MouseMoveDriver,
  MouseScrollDriver,
  KeyboardDriver,
  MouseClickDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
} from './drivers';
import {
  useContentEditableEffect,
  useCursorEffect,
  useViewportEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useFreeSelectionEffect,
  useSelectionEffect,
  useRotateEffect,
  useMoveNodeEffect,
  useResizeNodeEffect,
  useMouseScrollEffect,
  useMoveScreenEffect,
} from './effects';
import {
  AutoZoom,
  CompSidebar,
  DeleteComp,
  LayerSwitch,
  MoveCompDown,
  MoveCompLeft,
  MoveCompRight,
  MoveCompUp,
  MoveScreen,
  SettingsSwitch,
} from './shortcuts';

export const DEFAULT_EFFECTS = [
  useCursorEffect,
  useFreeSelectionEffect,
  useSelectionEffect,
  useContentEditableEffect,
  useKeyboardEffect,
  useViewportEffect,
  useAutoScrollEffect,
  useRotateEffect,
  useMoveNodeEffect,
  useResizeNodeEffect,
  useMouseScrollEffect,
  useMoveScreenEffect,
];

export const DEFAULT_DRIVERS = [
  MouseMoveDriver,
  MouseClickDriver,
  MouseScrollDriver,
  DragDropDriver,
  KeyboardDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
];

export const DEFAULT_SHORTCUTS = [
  AutoZoom,
  CompSidebar,
  LayerSwitch,
  MoveCompDown,
  MoveCompLeft,
  MoveCompRight,
  MoveCompUp,
  SettingsSwitch,
  DeleteComp,
  MoveScreen,
];
