import { ISchema } from '@formily/react';
import { fontWeights, legendIcons, legendLocations, orients } from '../../shared';

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
    textStyle: {
      type: 'object',
      title: '文本样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        fontSize: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字号',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 10,
          },
          default: 12,
        },
        fontWeight: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体粗细',
          },
          'x-component': 'Select',
          enum: fontWeights,
          default: 'normal',
        },
        color: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: '#e6e9ed',
        },
      },
    },
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
