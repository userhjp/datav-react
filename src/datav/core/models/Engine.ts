import { IEngineProps } from '../types';
import { Event } from '../../shared';
import { IPageType } from '../../react/interface';
import { Viewport, DataSource, Cursor, Toolbar, Operation, Keyboard, Screen } from './index';

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
    if (val.components) this.operation.components = val.components || [];
    if (val.page) this.screen.props = val.page;
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
