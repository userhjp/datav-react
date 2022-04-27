import { Engine } from '../core';
import { IWidgetConfig } from './interface';

export interface IDesignerLayoutProps {
  prefixCls?: string;
  theme?: 'dark' | 'light' | (string & {});
  variables?: Record<string, string>;
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine;
  /** 拖拽源数据 */
  resourceData: IResourceData[];
  /** 物料组件 */
  components: IDesignerComponents;
}

export interface IDesignerLayoutContext {
  theme?: 'dark' | 'light' | (string & {});
  prefixCls: string;
}

export interface IWorkspaceContext {
  id: string;
  title?: string;
  description?: string;
}

export interface IResourceDataType {
  name: string;
  cover: string;
  type?: string;
}

export interface IResourceChildrenType {
  name: string;
  children: Array<IResourceDataType>;
}

export type IResourceDataChild = Array<IResourceDataType | IResourceChildrenType>;

export interface IResourceData {
  name: string;
  icon: string;
  children?: IResourceDataChild;
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
