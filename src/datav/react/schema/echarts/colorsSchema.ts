import { ISchema } from '@formily/react';

export const colorsOpt = [
  { label: '颜色1', value: 1, color: ['#0a73ff', '#79daff', '#bdfdff', '#57cdff', '#a3f6ff'] },
  { label: '颜色2', value: 2, color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'] },
  { label: '颜色3', value: 3, color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8'] },
  { label: '颜色4', value: 4, color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'] },
];

/** 图表调色盘配置 */
export const colorsSchema: ISchema = {
  type: 'void',
  properties: {
    colors: {
      type: 'string',
      title: '调色盘',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: colorsOpt,
      default: 1,
    },
  },
};
