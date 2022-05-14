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
      enum: [
        ['#0a73ff', '#79daff', '#bdfdff', '#57cdff', '#a3f6ff', '#4caff9'],
        ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'],
        ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
        ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8'],
        ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
      ],
      default: 1,
    },
  },
};
