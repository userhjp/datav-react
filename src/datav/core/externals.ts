import { untracked } from '@formily/reactive';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from './presets';
import { Engine } from './models';
import { IEngineProps } from './types';
import { ApiType, FieldStatus, generateUUID, IDataType, isArr } from '../shared';
import {
  IEventField,
  IEventFieldSetting,
  IFieldSetting,
  IWidgetConfig,
  IWidgetData,
  IWidgetEvents,
  IWidgetProps,
} from '../react/interface';
import { DnComponent, DnFC } from '../react/types';

type ICreateWidgetConfig = {
  w: number;
  h: number;
  x: number;
  y: number;
  name: string;
  type: string;
  ver: string;
  data: {
    /** 默认数据 */
    value: IWidgetData;
    /** 字段描述映射 */
    fields?: Record<string, string>;
  };
  events: {
    changed: {
      /** 事件描述 */
      description: string;
      /** 字段映射 默认data.fields */
      fields?: IEventFieldSetting;
    };
  };
};

export const createDesigner = (props: IEngineProps<Engine> = {}) => {
  const drivers = props.drivers || [];
  const effects = props.effects || [];
  const shortcuts = props.shortcuts || [];
  return untracked(
    () =>
      new Engine({
        ...props,
        effects: [...effects, ...DEFAULT_EFFECTS],
        drivers: [...drivers, ...DEFAULT_DRIVERS],
        shortcuts: [...shortcuts, ...DEFAULT_SHORTCUTS],
      })
  );
};

/** 注册组件配置 */
export const registerWidgetConfig = (component: DnFC<any> | DnComponent<any>, config: IWidgetConfig): DnFC<any> | DnComponent<any> => {
  component.DnConfig = {
    w: 380,
    h: 220,
    ...config,
  };
  return component;
};

export const createWidgetFields = (fieldsDes: Record<string, string>): IFieldSetting => {
  const fields: IFieldSetting = {};
  Object.entries(fieldsDes).forEach(([key, val]) => {
    fields[key] = {
      map: '',
      description: val ?? '',
    };
  });
  return fields;
};

const contrastEventFields = (eventsFields: IEventFieldSetting): Array<IEventField> => {
  return Object.entries(eventsFields || {}).map(([key, val]) => {
    return {
      key,
      map: '',
      des: val ?? '-',
    };
  });
};

const createSettingData = (cfg: ICreateWidgetConfig) => {
  if (!cfg.data) return null;
  const fieldsDes = cfg.data?.fields ?? {};
  const dataType = isArr(cfg.data?.value) ? IDataType.array : IDataType.object;
  const fields: IFieldSetting = createWidgetFields(fieldsDes);
  return {
    fields,
    config: {
      dataType,
      data: cfg.data?.value || null,
      apiType: ApiType.static,
      useFilter: false,
      filterCode: 'return res;',
    },
    autoUpdate: false,
    updateTime: 1,
  };
};
export const createWidgetNode = (config: ICreateWidgetConfig): IWidgetProps => {
  const eventsFields: IWidgetEvents = Object.keys(config.events || {}).reduce((pval, cval) => {
    const eventOpt = config.events[cval];
    pval[cval] = {
      fields: eventOpt.fields ? contrastEventFields(eventOpt.fields) : [],
      description: eventOpt.description,
      enable: !!eventOpt.enable,
    };
    return pval;
  }, {} as IWidgetEvents);
  return {
    id: generateUUID(),
    info: { name: config.name, type: config.type, ver: config.ver },
    attr: { x: config.x, y: config.y, w: config.w, h: config.h },
    events: eventsFields,
    data: createSettingData(config),
  };
};
