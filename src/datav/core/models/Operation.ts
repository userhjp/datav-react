import { IWidgetSetting, IPageType } from '../../react/interface';
import { generateUUID } from '../../shared';
import { observable, define, action, toJS } from '@formily/reactive';
import { MoveSortType, ICustomEvent, isFn } from '../../shared';
import { PublishClickEvent, SnapshotClickEvent, PreviewClickEvent } from '../events';
import { IMoveType } from '../types';
import { Engine, Hover, Selection } from './index';
import { arrayMoveMutable } from 'array-move';
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
  components: IWidgetSetting[] = [];

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
      components: observable,
      addNode: action,
      removeCompSchema: action,
      copyCompSchema: action,
      rename: action,
      cancelRename: action,
      moveTo: action,
      sortComp: action,
      lockCom: action,
      singleCopy: action,
    });
  }

  /** 添加组件 */
  addNode(node: IWidgetSetting) {
    this.selection.safeSelect(node.id);
    this.components = [...this.components, node];
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
    this.components.push(comp);
    this.selection.safeSelect(comp.id);
  }

  /** 复制组件 */
  copyCompSchema(id?: string) {
    if (this.selection.length > 1) {
      this.selection.selected.forEach((id) => {
        this.singleCopy(id);
      });
    } else {
      this.singleCopy(id);
    }
  }

  startMove(comp: IWidgetSetting, type: IMoveType) {
    if (!comp) return;
    const grid = this.engine.screen.props.grid;
    switch (type) {
      case 'ArrowLeft':
        comp.attr.x -= grid;
        break;
      case 'ArrowUp':
        comp.attr.y -= grid;
        break;
      case 'ArrowRight':
        comp.attr.x += grid;
        break;
      case 'ArrowDown':
        comp.attr.y += grid;
        break;
      default:
        break;
    }
  }

  moveTo(type: IMoveType) {
    this.selection.selected.forEach((f) => {
      const comp = this.findById(f);
      this.startMove(comp, type);
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
        com.attr.isLock = isLock;
      });
      this.selection.clear();
    } else {
      const comp = this.findById(id);
      comp.attr.isLock = isLock;
      this.selection.remove(id);
    }
  }

  /** 隐藏显示组件 */
  hideCom(id: string, isHide: boolean) {
    if (this.selection.length > 1) {
      this.selection.selected.forEach((id) => {
        const com = this.findById(id);
        com.attr.isHide = isHide;
      });
    } else {
      const comp = this.findById(id);
      comp.attr.isHide = isHide;
    }
  }

  /** 重命名组件 */
  rename(uuid: string) {
    this.editableId = uuid;
    this.engine.toolbar.layer.show = true;
    const comp = this.findById(uuid);
    if (!comp.attr.isHide) this.selection.safeSelect(uuid);
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
    const pageData: IPageType = { page: this.engine.screen.props, components: this.components };
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
