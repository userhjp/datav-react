import { Engine } from '../core';

export interface IDesignerLayoutProps {
  prefixCls?: string;
  theme?: 'dark' | 'light' | (string & {});
  variables?: Record<string, string>;
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine;
}

// export interface IDesignerComponents {
//   [key: string]: DnFC<any>;
// }

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
  children: IResourceDataChild;
}

// export type DnFC<P = {}> = React.FC<P> & {
//   Resource?: IResource[];
//   Behavior?: IBehavior[];
// };

// export type DnComponent<P = {}> = React.ComponentType<P> & {
//   Resource?: IResource[];
//   Behavior?: IBehavior[];
// };
