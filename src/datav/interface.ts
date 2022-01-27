import { ZoomMode, ComDataType, FieldStatus, ApiType, ApiRequestMethod, MoveSortType } from './shared';
import { ISchema } from '@formily/react';

export type BaseComp = {
  w: number;
  h: number;
  x: number;
  y: number;
  name: string;
  type: string;
  ver: string;
  fieldsDes: Record<string, string>;
  data: Array<Record<string, any>> | Record<string, any>;
};

/** 组件位置信息 */
export interface ComPosition {
  x: number;
  y: number;
  w: number;
  h: number;
  deg?: number;
  opacity?: number;
}

/** 组件描述 */
export interface ComInfo {
  name: string;
  type: string;
  ver?: string;
}

/** 组件属性 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface ComType<T = { [key: string]: any }> {
  id: string;
  info: ComInfo;
  attr: ComPosition;
  options?: T;
  data?: any;
  event?: any;
}

/** 页面配置 */
export interface IScreenProps {
  width: number;
  height: number;
  scale: number;
  backgroundColor: string;
  backgroundImg: string;
  grid: number;
  zoomMode: ZoomMode;
}

export interface PageType {
  /** 页面设置 */
  page?: IScreenProps;
  components?: ComType[];
}

/** 组件数据类型 */
export interface DataSource {
  fields: FieldConfig;
  config: DataConfigType;
  autoUpdate: boolean;
  updateTime: number;
}

/** 数据配置 */
export interface DataConfigType {
  /** 数据来源 1 静态数据 2 API*/
  apiType: ApiType;
  data: Record<string, any> | Record<string, ComType>[];
  dataType: ComDataType;
  useFilter: boolean;
  filterCode: string;
  apiUrl?: string;
  apiMethod?: ApiRequestMethod;
  apiHeaders?: string;
  apiBody?: string;
}

/** 数据映射 */
export interface FieldConfig {
  [key: string]: { map: string; status: FieldStatus; description?: string };
}

export type WidgetEvent = {
  changed: {
    description: '当数据变化时';
    fields: Record<string, string>;
  };
};

export type WidgetConfig = Partial<{
  /** 组件宽度 */
  w: number;
  /** 组件高度 */
  h: number;
  /** 字段映射描述 可选 */
  fields: Record<string, string>;
  /** 组件基础属性，高宽位置等*/
  attr: ISchema;
  /** 交互数据属性 */
  events: WidgetEvent;
  /** 数据源 */
  data: Array<Record<string, any>> | Record<string, any>;
}>;

export type MoveType = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';