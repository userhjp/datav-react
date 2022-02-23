import { untracked } from '@formily/reactive';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from './presets';
import { Engine } from './models';
import { IEngineProps } from './types';
import { ApiType, FieldStatus, generateUUID, IDataType, isArr } from '../shared';
import { FieldConfig, IWidgetNode, WidgetResourceConfig } from '../react/interface';

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

export const createWidgetNode = (config: WidgetResourceConfig): IWidgetNode => {
  let dataType: IDataType;
  let _data = {};
  const fieldsDes = config.fieldsDes ?? {};
  const fields: FieldConfig = {};
  if (isArr(config.data)) {
    _data = config.data[0] || {};
    dataType = IDataType.array;
  } else {
    _data = config.data || {};
    dataType = IDataType.object;
  }
  Object.keys(_data).forEach((f) => {
    fields[f] = { map: '', status: FieldStatus.loading, description: fieldsDes[f] ?? '' };
  });
  return {
    id: generateUUID(),
    info: { name: config.name, type: config.type, ver: config.ver },
    attr: { x: config.x, y: config.y, w: config.w, h: config.h },
    data: {
      fields,
      config: {
        dataType,
        data: config.data || null,
        apiType: ApiType.static,
        useFilter: false,
        filterCode: 'return res.data;',
      },
    },
  };
};
