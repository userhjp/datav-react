import { IPageType } from '../react/interface';
import { Event, IEventProps } from '../shared';
import { Engine, Shortcut } from './models';
import { IDvFile } from './models/Upload';
import { ISnapshot } from './models/Snapshot';

export interface IDesignerStore<P> {
  value: P;
}

export type IDesignerIcons = Record<string, any>;

export type IDesignerIconsStore = IDesignerStore<IDesignerIcons>;

export type IEngineProps<T = Event> = IEventProps<T> & {
  shortcuts?: Shortcut[];
  /** 画布节点dom属性名 */
  canvasNodeAttrName?: string;
  /** 拖拽源Id的dom属性名 */
  sourceIdAttrName?: string;
  /** 节点Id的dom属性名 */
  nodeIdAttrName?: string;
  /** 原地编辑属性名 */
  contentEditableAttrName?: string;
  /** 点击阻止冒泡属性 */
  clickStopPropagationAttrName?: string;
  /** 大纲节点ID的dom属性名 */
  outlineNodeIdAttrName?: string;
  /** 节点尺寸拖拽手柄属性名 */
  nodeResizeHandlerAttrName?: string;
  /** 节点旋转dom属性名 */
  nodeRotateHanderAttrName?: string;
  /** 发布按钮点击事件 */
  onPublish?: (data: IPageType) => void | Promise<void>;
  /** 生成快照按钮点击事件 */
  onSnapshot?: (data: IPageType) => void | Promise<void>;
  /** 加载快照详情 */
  loadSnapshot?: (data: ISnapshot) => void | Promise<ISnapshot | void>;
  /** 删除快照 */
  removeSnapshot?: (data: ISnapshot) => boolean | void | Promise<boolean | void>;
  /** 预览按钮点击事件 */
  onPreview?: (data: IPageType) => void | Promise<void>;
  /** 帮助按钮点击事件 */
  onHelp?: (data: IPageType) => void | Promise<void>;
  /** 删除图片资源 */
  removeFile?: (data: IDvFile) => boolean | void | Promise<boolean | void>;
};

export type IEngineContext = {
  engine: Engine;
};

export type IMoveType = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';
