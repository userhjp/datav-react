import { IWidgetProps } from '../../react/interface';
import { copyText, generateUUID } from '../../shared/utils';
import { observable, define, action, toJS } from '@formily/reactive';
import { MoveSortType, ICustomEvent, isFn } from '../../shared';
import { IMoveType } from '../types';
import { arrayMoveMutable } from 'array-move';
import { WidgetNode } from './WidgetNode';
import { Hover } from './Hover';
import { Engine } from './Engine';
import { Selection } from './Selection';
import { message } from 'antd';
import { createWidgetNode } from '../externals';

export interface IOperation {
  selection: Selection;
  hover: Hover;
  engine: Engine;
}

export class Operation {
  selection: Selection;
  engine: Engine;
  hover: Hover;
  editableId: string;
  components: WidgetNode[] = [];

  constructor(engine: Engine) {
    this.engine = engine;
    this.selection = new Selection(this);
    this.hover = new Hover({
      operation: this,
    });
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      editableId: observable.ref,
      errors: observable.computed,
      components: observable.shallow,
      addNode: action,
      removeCompSchema: action,
      copyCompSchema: action,
      rename: action,
      cancelRename: action,
      moveTo: action,
      sortComp: action,
      lockCom: action,
      hideCom: action,
      singleCopy: action,
      batchAddNode: action,
      pasteClipboard: action,
    });
  }

  get errors() {
    return this.components.filter((f) => f.errorInfo).map((m) => ({ id: m.id, errorInfo: m.errorInfo }));
  }

  createNode({ x = 0, y = 0, name, type, dnConfig }) {
    const comW = dnConfig.w || 380;
    const comH = dnConfig.h || 220;
    if (!dnConfig) return null;
    const attrPosition = this.engine.viewport.calcComponentPoint(comW, comH, x, y);
    const widgetNode = createWidgetNode({
      w: comW,
      h: comH,
      x: attrPosition.x,
      y: attrPosition.y,
      name,
      type,
      data: dnConfig.data,
      options: dnConfig.defaultConfig,
      ver: dnConfig.version || '1.0',
      events: dnConfig.events,
    });
    return widgetNode;
  }

  setNodes(nodes: IWidgetProps[]) {
    const widgets = nodes.map((m) => new WidgetNode(m));
    this.components = [...widgets];
  }

  /** 批量添加组件 */
  batchAddNode(nodes: IWidgetProps[]) {
    const widgets = nodes.map((m) => new WidgetNode(m));
    this.components = [...widgets, ...this.components];
  }

  /** 添加组件 */
  addNode(node: IWidgetProps) {
    if (!node) return;
    this.components.unshift(new WidgetNode(node));
    this.selection.safeSelect(node.id);
  }

  /** 移除组件 */
  removeCompSchema(id?: string) {
    if (this.selection.length > 1) {
      this.selection.selected.forEach((id) => {
        this.selection.remove(id);
        this.components = this.components.filter((f) => f.id !== id);
      });
    } else {
      if (!id) id = this.selection.first;
      this.selection.remove(id);
      this.components = this.components.filter((f) => f.id !== id);
    }
  }

  singleCopy(id: string) {
    const comp = toJS(this.components.find((f) => f.id === id));
    comp.attr.x += 30;
    comp.attr.y += 20;
    comp.id = generateUUID();
    this.addNode(comp);
    return comp.id;
  }

  /** 复制组件 */
  copyCompSchema(id?: string) {
    if (this.selection.length > 1) {
      const ids = [];
      this.selection.selected.forEach((id) => {
        const newId = this.singleCopy(id);
        ids.push(newId);
      });
      this.selection.batchSafeSelect(ids);
    } else {
      const newId = this.singleCopy(id);
      this.selection.safeSelect(newId);
    }
  }

  /** 复制组件到剪贴板 */
  copeClipboard() {
    const node = this.findById(this.selection.last);
    if (!node) return;
    copyText(JSON.stringify(node));
    message.success({
      duration: 1,
      content: `"${node.info.name}"已复制`,
      className: 'dv-message-class',
    });
  }

  /** 粘贴剪贴板组件 */
  async pasteClipboard(x: number = null, y: number = null) {
    const dataStr = await navigator.clipboard?.readText();
    if (!dataStr) {
      message.error({
        content: `无法使用剪贴板`,
        className: 'dv-message-class',
      });
      return;
    }
    try {
      const config: WidgetNode = JSON.parse(dataStr);
      const canvasPoint = this.engine.viewport.calcComponentPoint(config.attr.w, config.attr.h, x, y);
      config.attr.x = canvasPoint.x;
      config.attr.y = canvasPoint.y;
      config.id = generateUUID();
      this.addNode(config);
    } catch (error) {
      console.info('组件粘贴失败, 不是组件或配置有误');
    }
    navigator.clipboard.writeText('');
  }

  moveTo(type: IMoveType) {
    this.selection.selected.forEach((f) => {
      const comp = this.findById(f);
      const grid = this.engine.screen.props.grid;
      comp.moveTo(type, grid);
    });
  }

  /** 组件权重 */
  sortSingleNode(id: string, moveType: MoveSortType) {
    const i = this.components.findIndex((f) => f.id === id);
    if (moveType === MoveSortType.down) {
      arrayMoveMutable(this.components, i, i + 1);
    } else if (moveType === MoveSortType.up) {
      arrayMoveMutable(this.components, i, i - 1);
    } else if (moveType === MoveSortType.bottom) {
      arrayMoveMutable(this.components, i, this.components.length - 1);
    } else if (moveType === MoveSortType.top) {
      arrayMoveMutable(this.components, i, 0);
    }
  }

  sortComp(moveType: MoveSortType, id: string) {
    if (!id) return;
    if (this.selection.length) {
      this.selection.selected.forEach((f) => {
        this.sortSingleNode(f, moveType);
      });
    } else {
      this.sortSingleNode(id, moveType);
    }
  }

  /** 组件锁定 */
  lockCom(id: string, isLock: boolean) {
    if (this.selection.length > 1) {
      this.selection.selected.forEach((id) => {
        const com = this.findById(id);
        com.isLock = isLock;
      });
      this.selection.clear();
    } else {
      const comp = this.findById(id);
      comp.isLock = isLock;
      this.selection.remove(id);
    }
  }

  /** 隐藏显示组件 */
  hideCom(id: string, isHide: boolean) {
    if (this.selection.length > 1) {
      this.selection.selected.forEach((id) => {
        const com = this.findById(id);
        com.isHide = isHide;
      });
      this.selection.remove(...this.selection.selected);
    } else {
      const comp = this.findById(id);
      comp.isHide = isHide;
      this.selection.remove(id);
    }
  }

  /** 重命名组件 */
  rename(uuid: string) {
    this.editableId = uuid;
    this.engine.toolbar.layer.show = true;
    const comp = this.findById(uuid);
    if (!comp.isHide) this.selection.safeSelect(uuid);
  }

  /** 取消编辑 */
  cancelRename() {
    this.editableId = null;
  }

  dispatch(event: ICustomEvent, callback?: () => void) {
    if (this.engine.dispatch(event) === false) return;
    if (isFn(callback)) return callback();
  }

  findById(id: string) {
    if (!id) return null;
    return this.components.find((f) => f.id === id);
  }
}
