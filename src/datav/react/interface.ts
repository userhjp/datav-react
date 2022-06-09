import { ZoomMode, IDataType, FieldStatus, ApiType, ApiRequestMethod } from '../shared';
import { ISchema } from '@formily/react';
import { IDvGlobal } from '../core';

export type IWidgetData = Array<Record<string, any>> | Record<string, any> | any;

export type IWidgetConfig = {
  /** 权限标识  */
  acl?: string;
  /** 所属组件路径，'.'符号分割，例如："一级分类.二级分类.图表名称" 或 "一级分类.图表名称" 最多3级 多余忽略 */
  taxonPath: string;
  /** 组件排序 升序 */
  sort?: number;
  /** 组件封面 */
  cover: string;
  /** 组件默认宽度 380 */
  w?: number;
  /** 组件默认高度 220 */
  h?: number;
  /** 组件属性Schema*/
  schema?: ISchema;
  /** 交互数据属性 */
  events?: {
    /** 映射字段到全局变量 */
    changed: {
      /** 事件描述 */
      description: string;
      /** 字段映射 默认data.fields */
      fields?: IEventFieldSetting;
    };
    [key: string]: {
      description: string;
      fields?: IEventFieldSetting;
    };
  };
  /** 版本号 */
  version?: string;
  /** 组件数据（如果有） */
  data?: {
    /** 默认数据 */
    value: IWidgetData;
    /** 字段映射 未设置则返回全部字段*/
    fields?: Record<string, string>;
  };
};

/** 组件属性 */
export interface IWidgetProps<T = { [key: string]: any }> {
  id: string;
  info: IWidgetInfo;
  attr: IWidgetAttr;
  options?: T;
  data?: IWidgetData;
  events?: IWidgetEvents;
  visible?: IVisible;
}

/** 组件位置信息 */
export interface IWidgetAttr {
  x: number;
  y: number;
  w: number;
  h: number;
  deg?: number;
  opacity?: number;
  isLock?: boolean;
  isHide?: boolean;
}

/** 组件描述 */
export interface IWidgetInfo {
  name: string;
  type: string;
  ver?: string;
}

export interface IWidgetSetting {
  id: string;
  info: IWidgetInfo;
  attr: IWidgetAttr;
  options?: { [key: string]: any };
  data?: IDataSetting;
  events?: IWidgetEvents;
  /** 组件显示隐藏 */
  visible: IVisible;
}

/** 页面配置 */
export interface IScreenProps {
  width: number;
  height: number;
  // scale: number;
  backgroundColor: string;
  backgroundImg: string;
  grid: number;
  zoomMode: ZoomMode;
}

export interface IPageType {
  /** 页面设置 */
  page?: IScreenProps;
  components?: IWidgetProps[];
  global?: IDvGlobal;
}

/** 数据映射 */
export interface IFieldSetting {
  [key: string]: { map: string; description?: string };
}

export interface IEventFieldSetting {
  [key: string]: string;
}

export interface IEventField {
  key: string;
  map: string;
  des: string;
  extend?: boolean;
}

/** 组件数据类型 */
export interface IDataSetting {
  fields?: IFieldSetting;
  config: IDataSourceSetting;
  autoUpdate: boolean;
  updateTime: number;
}

export interface IChangedEvent {
  description: string;
  enable?: boolean;
  fields?: IEventField[];
}

export interface IWidgetEvents {
  [key: string]: IChangedEvent;
}

export interface IVisible {
  enable: boolean;
  key: string;
  val: string;
  type: 'hide' | 'destroy';
}

/** 数据配置 */
export interface IDataSourceSetting {
  /** 数据来源 */
  apiType: ApiType;
  data: Record<string, any> | Record<string, IWidgetProps>[];
  dataType: IDataType;
  useFilter: boolean;
  filterCode: string;
  apiUrl?: string;
  apiMethod?: ApiRequestMethod;
  apiHeaders?: string;
  apiBody?: string;

  globalDataId?: string;
}
