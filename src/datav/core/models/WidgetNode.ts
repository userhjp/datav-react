import { IDataSetting, IVisible, IWidgetAttr, IWidgetEvents, IWidgetInfo, IWidgetProps } from '../../react/interface';
import { IMoveType } from '../types';
import { action, define, observable } from '@formily/reactive';
export type NodeError = {
  title: string;
  content: string;
};
export class WidgetNode {
  id: string;
  /** 组件基础信息 */
  info: IWidgetInfo;
  /** 组件位置信息 */
  attr: IWidgetAttr;
  /** 组件数据配置 */
  data: IDataSetting;
  /** 组件事件 */
  events: IWidgetEvents;
  /** 组件配置 */
  options: Record<string, any>;
  /** 组件显示隐藏 */
  visible: IVisible;
  /** 组件异常信息 */
  errorInfo: NodeError;
  /** 组件是否锁定 */
  isLock?: boolean;
  /** 组件是否隐藏 */
  isHide?: boolean;

  constructor(props: IWidgetProps) {
    this.id = props.id;
    this.info = props.info;
    this.attr = props.attr;
    this.data = props.data;
    this.events = props.events;
    this.options = props.options || {};
    this.visible = props.visible || {
      enable: false,
      key: '',
      val: '',
      type: 'hide',
      renderDom: false,
    };
    this.isLock = !!props.isLock;
    this.isHide = !!props.isHide;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      info: observable,
      attr: observable,
      data: observable.shallow,
      events: observable,
      options: observable,
      visible: observable,
      isLock: observable.ref,
      isHide: observable.ref,
      errorInfo: observable.shallow,
      moveTo: action,
      changeLock: action,
      changeVisible: action,

      setError: action,
      clearError: action,
    });
  }

  moveTo(type: IMoveType, grid: number) {
    switch (type) {
      case 'ArrowLeft':
        this.attr.x -= grid;
        break;
      case 'ArrowUp':
        this.attr.y -= grid;
        break;
      case 'ArrowRight':
        this.attr.x += grid;
        break;
      case 'ArrowDown':
        this.attr.y += grid;
        break;
      default:
        break;
    }
  }

  changeLock(isLock: boolean) {
    this.isLock = !!isLock;
  }

  changeVisible(isHide: boolean) {
    this.isHide = !!isHide;
  }

  setError(error: NodeError) {
    this.errorInfo = error;
  }

  clearError() {
    this.errorInfo = null;
  }
}
