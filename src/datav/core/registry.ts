import { observable } from '@formily/reactive';

export interface IDesignerStore<P> {
  value: P;
}

export type IDesignerIcons = Record<string, any>;

export type IDesignerIconsStore = IDesignerStore<IDesignerIcons>;

const DATAV_ICONS_STORE: IDesignerIconsStore = observable.ref({});

const DATAV_GlobalRegistry = {
  getDesignerIcon: (name: string) => {
    return DATAV_ICONS_STORE[name];
  },

  registerDesignerIcons: (map: IDesignerIcons) => {
    Object.assign(DATAV_ICONS_STORE, map);
  },
};

export type IDesignerRegistry = typeof DATAV_GlobalRegistry;

export const GlobalRegistry: IDesignerRegistry = window['__DATAV_GlobalRegistry__'] || DATAV_GlobalRegistry;
