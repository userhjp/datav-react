import { untracked } from '@formily/reactive';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from './presets';
import { Engine } from './models';
import { IEngineProps } from './types';
import { ApiType, FieldStatus, generateUUID, IDataType, isArr } from '../shared';
import { IFieldSetting, IWidgetConfig, IWidgetData, IWidgetEvents, IWidgetProps } from '../react/interface';
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
      fields?: Record<string, string>;
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
export const registerWidgetConfig = (comoinent: DnFC<any> | DnComponent<any>, config: IWidgetConfig): void => {
  comoinent.DnConfig = {
    w: 380,
    h: 220,
    ...config,
  };
};

export const createWidgetFields = (fieldsDes: Record<string, string>): IFieldSetting => {
  const fields: IFieldSetting = {};
  Object.entries(fieldsDes).forEach(([key, val]) => {
    fields[key] = {
      map: '',
      status: FieldStatus.loading,
      description: val ?? '',
    };
  });
  return fields;
};

export const createWidgetNode = (config: ICreateWidgetConfig): IWidgetProps => {
  const fieldsDes = config.data?.fields ?? {};
  const dataType = isArr(config.data?.value) ? IDataType.array : IDataType.object;
  const fields: IFieldSetting = createWidgetFields(fieldsDes);
  const eventsFields: IWidgetEvents = Object.keys(config.events || {}).reduce((pval, cval) => {
    const eventOpt = config.events[cval];
    pval[cval] = {
      fields: eventOpt.fields ? createWidgetFields(eventOpt.fields) : fields,
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
    data: {
      fields,
      config: {
        dataType,
        data: config.data?.value || null,
        apiType: ApiType.static,
        useFilter: false,
        filterCode: 'return res.data;',
      },
      autoUpdate: false,
      updateTime: 1,
    },
  };
};
