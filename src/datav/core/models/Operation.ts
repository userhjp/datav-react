import { IPageType, IWidgetProps } from '../../react/interface';
import { generateUUID } from '../../shared/utils';
import { observable, define, action, toJS } from '@formily/reactive';
import { MoveSortType, ICustomEvent, isFn } from '../../shared';
import { PublishClickEvent, SnapshotClickEvent, PreviewClickEvent } from '../events';
import { IMoveType } from '../types';
import { arrayMoveMutable } from 'array-move';
import { WidgetNode } from './WidgetNode';
import { Hover } from './Hover';
import { Engine } from './Engine';
import { Selection } from './Selection';

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
    });
  }

  get errors() {
    return this.components.filter((f) => f.errorInfo).map((m) => ({ id: m.id, errorInfo: m.errorInfo }));
  }

  /** 批量添加组件 */
  batchAddNode(nodes: IWidgetProps[]) {
    const widgets = nodes.map((m) => new WidgetNode(m));
    this.components = [...widgets, ...this.components];
  }

  /** 添加组件 */
  addNode(node: IWidgetProps) {
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

  onOperationBtn(type: 'publish' | 'snapshot' | 'preview' | 'help') {
    const pageData: IPageType = { page: this.engine.screen.props, components: this.components, global: this.engine.global.props };
    switch (type) {
      case 'publish':
        this.dispatch(new PublishClickEvent(pageData));
        break;
      case 'snapshot':
        this.dispatch(new SnapshotClickEvent(pageData));
        break;
      case 'preview':
        this.dispatch(new PreviewClickEvent(pageData));
        break;
      default:
        break;
    }
  }
}
