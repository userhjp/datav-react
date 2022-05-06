import React from 'react';
import { Engine } from '../core';
import { IWidgetConfig } from './interface';

export interface IDesignerLayoutProps {
  /** 拖拽源数据分类配置 */
  menu: IWidgetMenu[];
  prefixCls?: string;
  theme?: 'dark' | 'light' | (string & {});
  variables?: Record<string, string>;
}
export interface IDesignerProps extends IDesignerLayoutProps {
  /** 拖拽源数据分类配置 */
  menu: IWidgetMenu[];
  engine: Engine;
  /** 物料组件 */
  components: IDesignerComponents;
}

export interface IDesignerLayoutContext {
  /** 拖拽源数据分类配置 */
  menu: IWidgetMenu[];
  theme?: 'dark' | 'light' | (string & {});
  prefixCls: string;
}

export interface IDesignerContext {
  engine: Engine;
  /** 物料组件 */
  components: IDesignerComponents;
}

export interface IWorkspaceContext {
  id: string;
  title?: string;
  description?: string;
}

export interface IWidgetMenuData {
  name: string;
  cover: string;
  type: string;
  dnConfig: IWidgetConfig;
}

export interface IWidgetMenuChildData {
  name: string;
  children: Array<IWidgetMenuData>;
}

export type IWidgetMenuChild = Array<IWidgetMenuData | IWidgetMenuChildData>;

export interface IWidgetMenu {
  name: string;
  icon: string;
  children?: IWidgetMenuChild;
}

export type DnFC<P = {}> = React.FC<P> & {
  DnConfig?: IWidgetConfig;
};

export type DnComponent<P = {}> = React.ComponentType<P> & {
  DnConfig?: IWidgetConfig;
};

export interface IDesignerComponents {
  [key: string]: DnFC<any> | DnComponent<any>;
}
