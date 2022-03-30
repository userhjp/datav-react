import { ISchema } from '@formily/react';

/** 图表颜色配置 */
export const seriesColorSchema: ISchema = {
  type: 'array',
  'x-component': 'ArrayItems',
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    tooltip: '单独配置系列颜色，默认取调色盘颜色，多个颜色表示渐变色',
    tooltipLayout: 'text',
  },
  title: '颜色配置',
  items: {
    type: 'void',
    'x-component': 'Space',
    properties: {
      sort: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.SortHandle',
      },
      input: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
      },
      remove: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.Remove',
      },
    },
  },
  properties: {
    add: {
      type: 'void',
      title: '添加颜色',
      'x-component': 'ArrayItems.Addition',
      'x-component-props': {
        defaultValue: '#1179ff',
      },
    },
  },
};
