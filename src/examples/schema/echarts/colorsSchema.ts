import { ISchema } from '@formily/react';

/** 图表调色盘配置 */
export const colorsSchema: ISchema = {
  type: 'void',
  properties: {
    colors: {
      type: 'string',
      title: '调色盘',
      'x-decorator': 'FormItem',
      'x-component': 'Palette',
      default: ['#0a73ff', '#79daff', '#bdfdff', '#57cdff', '#a3f6ff', '#4caff9'],
    },
  },
};
