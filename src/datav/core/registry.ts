import { observable } from '@formily/reactive';
import { IDesignerComponents } from '../react/types';
import { IDesignerIcons, IDesignerIconsStore, IDesignerWidgets, IDesignerWidgetStore } from './types';

const DESIGNER_WIDGETS_STORE: IDesignerWidgetStore = observable.ref({});

const DATAV_ICONS_STORE: IDesignerIconsStore = observable.ref({});

const DATAV_GlobalRegistry = {
  getDesignerWidget: (name: string) => {
    return DESIGNER_WIDGETS_STORE[name];
  },

  registerDesignerWidget: (widgets: IDesignerComponents) => {
    Object.assign(DESIGNER_WIDGETS_STORE, widgets);
  },

  getDesignerIcon: (name: string) => {
    return DATAV_ICONS_STORE[name];
  },

  registerDesignerIcons: (map: IDesignerIcons) => {
    Object.assign(DATAV_ICONS_STORE, map);
  },
};

export type IDesignerRegistry = typeof DATAV_GlobalRegistry;

export const GlobalRegistry: IDesignerRegistry = DATAV_GlobalRegistry;
