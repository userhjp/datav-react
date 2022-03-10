import { lineStyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const lineStyleSchema: ISchema = {
  type: 'object',
  title: '线条样式',
  'x-decorator': 'FormItem',
  'x-component': 'FormGrid',
  'x-component-props': {
    minColumns: 2,
    rowGap: 0,
  },
  properties: {
    color: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '颜色',
      },
      'x-component': 'ColorPicker',
      default: 'rgba(5, 213, 255, .8)',
    },
    width: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '线宽',
      },
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 1,
    },
    type: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '类型',
      },
      'x-component': 'Select',
      enum: lineStyles,
      default: 'solid',
    },
    dashOffset: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '虚线偏移量',
      },
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      'x-visible': false,
      'x-reactions': {
        dependencies: ['.type'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "dashed"}}',
          },
        },
      },
      default: 0,
    },
  },
};
