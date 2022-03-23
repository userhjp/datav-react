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
      title: '图例样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        icon: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '图形',
          },
          'x-component': 'Select',
          enum: legendIcons,
          default: '',
        },
        itemGap: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '间隔',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 14,
        },
        itemWidth: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '宽度',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 14,
        },
        itemHeight: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '高度',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 14,
        },
      },
    },
  },
};
