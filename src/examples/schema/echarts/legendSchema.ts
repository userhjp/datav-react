import { ISchema } from '@formily/react';
import { fontWeights, legendIcons, legendLocations, orients } from '../../shared';
import { textSchema } from '../textSchema';

/** 图例 */
export const legendSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '图例',
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    position: {
      type: 'string',
      title: '位置',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: legendLocations,
      default: 'top-center',
    },
    orient: {
      type: 'string',
      title: '布局方式',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: orients,
      default: 'horizontal',
    },
    textStyle: textSchema('object'),
    iconVoid: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '图例图标',
      },
      properties: {
        icon: {
          type: 'string',
          title: '图标',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: legendIcons,
          default: '',
        },
        itemWidth: {
          type: 'number',
          title: '宽度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 26,
        },
        itemHeight: {
          type: 'number',
          title: '高度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 14,
        },
        itemGap: {
          type: 'number',
          title: '间隔',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 10,
        },
      },
    },
  },
};
