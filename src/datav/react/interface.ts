import { ZoomMode, IDataType, FieldStatus, ApiType, ApiRequestMethod, MoveSortType } from '../shared';
import { ISchema } from '@formily/react';

export type IWidgetData = Array<Record<string, any>> | Record<string, any> | any;

export type IWidgetConfig = {
  /** 组件默认宽度 380 */
  w?: number;
  /** 组件默认高度 220 */
  h?: number;
  /** 组件属性Schema*/
  schema?: ISchema;
  /** 交互数据属性 */
  events?: IWidgetEvents;
  /** 版本号 */
  version?: string;
  /** 组件数据（如果有） */
  data?: {
    /** 默认数据 */
    value: IWidgetData;
    /** 字段描述映射 */
    fields: Record<string, string>;
  };
};

/** 组件属性 */
export interface IWidgetProps<T = { [key: string]: any }> {
  id: string;
  info: IWidgetInfoSetting;
  attr: IWidgetAttrSetting;
  options?: T;
  data?: IWidgetData;
  events?: IWidgetEvents;
}

/** 组件位置信息 */
export interface IWidgetAttrSetting {
  x: number;
  y: number;
  w: number;
  h: number;
  deg?: number;
  opacity?: number;
}

/** 组件描述 */
export interface IWidgetInfoSetting {
  name: string;
  type: string;
  ver?: string;
}

export interface IWidgetSetting {
  id: string;
  info: IWidgetInfoSetting;
  attr: IWidgetAttrSetting;
  options?: { [key: string]: any };
  data?: IDataSetting;
  events?: IWidgetEvents;
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
}

/** 数据映射 */
export interface IFieldSetting {
  [key: string]: { map: string; status: FieldStatus; description?: string };
}

/** 组件数据类型 */
export interface IDataSetting {
  fields: IFieldSetting;
  config: IDataSourceSetting;
  autoUpdate: boolean;
  updateTime: number;
}

export interface IChangedEvent {
  description: string;
  enable?: boolean;
  fields?: IFieldSetting;
}

export interface IWidgetEvents {
  changed: IChangedEvent;
}

/** 数据配置 */
export interface IDataSourceSetting {
  /** 数据来源 1 静态数据 2 API*/
  apiType: ApiType;
  data: Record<string, any> | Record<string, IWidgetProps>[];
  dataType: IDataType;
  useFilter: boolean;
  filterCode: string;
  apiUrl?: string;
  apiMethod?: ApiRequestMethod;
  apiHeaders?: string;
  apiBody?: string;
}
