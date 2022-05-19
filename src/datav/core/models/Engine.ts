import { IEngineProps } from '../types';
import { Event } from '../../shared/event';
import { IPageType } from '../../react/interface';
import { Viewport } from './Viewport';
import { DataSource } from './DataSource';
import { Cursor } from './Cursor';
import { Toolbar } from './Toolbar';
import { Operation } from './Operation';
import { Keyboard } from './Keyboard';
import { Screen } from './Screen';
import { DvGlobal } from './DvGlobal';

/**
 * 设计器引擎
 */
export class Engine extends Event {
  props: IEngineProps<Engine>;

  viewport: Viewport;

  dataSource: DataSource;

  cursor: Cursor;

  toolbar: Toolbar;

  operation: Operation;

  screen: Screen;

  keyboard: Keyboard;

  global: DvGlobal;

  constructor(props: IEngineProps<Engine>) {
    super(props);
    this.props = {
      ...Engine.defaultProps,
      ...props,
    };
    this.toolbar = new Toolbar();
    this.dataSource = new DataSource(this);
    this.cursor = new Cursor(this);
    this.screen = new Screen({
      engine: this,
    });
    this.keyboard = new Keyboard(this);
    this.viewport = new Viewport({
      engine: this,
      viewportElement: null,
      nodeIdAttrName: this.props.nodeIdAttrName,
      contentWindow: window,
    });
    this.operation = new Operation(this);
    this.global = new DvGlobal();
  }

  createViewport(viewportElement: HTMLElement) {
    this.viewport = new Viewport({
      engine: this,
      viewportElement,
      nodeIdAttrName: this.props.nodeIdAttrName,
      contentWindow: window,
    });
  }

  setInitialValue(val: IPageType) {
    if (!val) return;
    if (val.components) this.operation.batchAddNode(val.components || []);
    if (val.page) this.screen.setProps(val.page);
    if (val.global) {
      this.global.setProps(val.global);
    }
  }

  mount() {
    this.attachEvents(window);
  }

  unmount() {
    this.detachEvents();
  }

  static defaultProps: IEngineProps<Engine> = {
    shortcuts: [],
    effects: [],
    drivers: [],
    canvasNodeAttrName: 'canvas-drawing',
    sourceIdAttrName: 'data-designer-source-id',
    nodeIdAttrName: 'data-designer-node-id',
    contentEditableAttrName: 'data-content-editable',
    clickStopPropagationAttrName: 'data-click-stop-propagation',
    nodeResizeHandlerAttrName: 'data-designer-node-resize-handler',
    outlineNodeIdAttrName: 'data-designer-outline-node-id',
    nodeRotateHanderAttrName: 'data-designer-node-rotate-id',
    // defaultScreenType: ScreenType.PC,
    onPublish: () => {},
  };
}
