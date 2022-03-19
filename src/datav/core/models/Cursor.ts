import { Engine } from './Engine';
import { action, define, observable } from '@formily/reactive';

export enum CursorStatus {
  Normal = 'NORMAL',
  DragStart = 'DRAG_START',
  Dragging = 'DRAGGING',
  DragStop = 'DRAG_STOP',
}

export enum CursorDragType {
  Normal = 'NORMAL',
  Resize = 'RESIZE',
  Rotate = 'ROTATE',
  Translate = 'TRANSLATE',
  Screen = 'SCREEN',
}

export enum CursorType {
  Normal = 'NORMAL',
  Selection = 'SELECTION',
}

export interface ICursorPosition {
  pageX?: number;

  pageY?: number;

  clientX?: number;

  clientY?: number;

  topPageX?: number;

  topPageY?: number;

  topClientX?: number;

  topClientY?: number;
}

export interface ICursor {
  status?: CursorStatus;

  position?: ICursorPosition;

  dragStartPosition?: ICursorPosition;

  dragEndPosition?: ICursorPosition;

  view?: Window;
}

const DEFAULT_POSITION = {
  pageX: 0,
  pageY: 0,
  clientX: 0,
  clientY: 0,
  topPageX: 0,
  topPageY: 0,
  topClientX: 0,
  topClientY: 0,
};

const createPositionDelta = (end: ICursorPosition, start: ICursorPosition): ICursorPosition => {
  return Object.keys(end || {}).reduce((buf, key) => {
    buf[key] = end[key] - start[key];
    return buf;
  }, {});
};

export class Cursor {
  engine: Engine;

  type: CursorType | string = CursorType.Normal;

  dragType: CursorDragType | string = CursorDragType.Normal;

  status: CursorStatus = CursorStatus.Normal;

  position: ICursorPosition = DEFAULT_POSITION;

  dragStartPosition: ICursorPosition = DEFAULT_POSITION;

  dragEndPosition: ICursorPosition = DEFAULT_POSITION;

  view: Window = window;

  constructor(engine: Engine) {
    this.engine = engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      type: observable.ref,
      status: observable.ref,
      position: observable.ref,
      dragStartPosition: observable.ref,
      dragEndPosition: observable.ref,
      view: observable.ref,
      setPosition: action,
      setStatus: action,
      setType: action,
      setDragType: action,
    });
  }

  get dragOffsetDelta() {
    return createPositionDelta(this.dragStartPosition, this.dragEndPosition);
  }

  setStatus(status: CursorStatus) {
    this.status = status;
  }

  setDragType(type: CursorDragType | string) {
    this.dragType = type;
  }

  setType(type: CursorType | string) {
    this.type = type;
  }

  setStyle(style: string) {
    const el = this.engine.viewport.contentWindow?.document?.body.querySelector(
      `*[${this.engine.props.canvasNodeAttrName}]`
    ) as HTMLDivElement;
    if (el) {
      el.style.cursor = style;
    }
  }

  setPosition(position?: ICursorPosition) {
    this.position = {
      ...this.position,
      ...position,
    };
  }
  setDragStartPosition(position?: ICursorPosition) {
    this.dragStartPosition = {
      ...this.dragStartPosition,
      ...position,
    };
  }
  setDragEndPosition(position?: ICursorPosition) {
    this.dragEndPosition = {
      ...this.dragEndPosition,
      ...position,
    };
  }
}
