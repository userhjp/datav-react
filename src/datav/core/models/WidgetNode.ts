import { IDataSetting, IVisible, IWidgetAttr, IWidgetEvents, IWidgetInfo, IWidgetProps } from '../../react/interface';
import { IMoveType } from '../types';
import { action, define, observable } from '@formily/reactive';

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
    };
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      info: observable,
      attr: observable,
      data: observable,
      events: observable,
      options: observable,
      visible: observable,
      moveTo: action,
      changeLock: action,
      changeVisible: action,
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
    this.attr.isLock = !!isLock;
  }

  changeVisible(isHide: boolean) {
    this.attr.isHide = !!isHide;
  }
}
