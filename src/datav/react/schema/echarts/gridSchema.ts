import { ISchema } from '@formily/react';
import { colorsSchema } from './colorsSchema';

/** 网格基础配置 */
export const echartGridSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '图表',
    noPadding: true,
  },
  properties: {
    gridVoid: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '网格样式',
        switch: true,
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '网格背景色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(0,0,0,0)',
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(0,0,0,0)',
        },
        borderWidth: {
          type: 'number',
          title: '网格线宽',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 1,
        },
      },
    },
    colors: colorsSchema,
    distance: {
      type: 'void',
      title: '网格边距',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        left: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '左',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 50,
        },
        right: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '右',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 40,
        },
        top: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '上',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 50,
        },
        bottom: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '下',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 50,
        },
      },
    },
  },
};
