import { ISchema } from '@formily/react';
import { areaStyleSchema } from './areaStyleSchema';
import { labelSchema } from './labelSchema';
import { symbolStyleSchema } from './symbolStyleSchema';

/** 雷达图系列公共配置 */
export const radarSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '系列样式',
    noPadding: true,
  },
  default: {
    areaStyle: {
      color: ['#1179ff'],
    },
  },
  properties: {
    label: labelSchema,
    symbolVoid: symbolStyleSchema,
    areaStyle: areaStyleSchema(true),
  },
};
