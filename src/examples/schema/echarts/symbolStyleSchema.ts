import { symbolTyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

/** 拐点样式 */
export const symbolStyleSchema: ISchema = {
  type: 'void',
  title: '拐点样式',
  'x-decorator': 'FormItem',
  'x-component': 'FormGrid',
  'x-component-props': {
    minColumns: 2,
    rowGap: 0,
  },
  properties: {
    symbolSize: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '大小',
      },
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 10,
    },
    symbolRotate: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '旋转角度',
      },
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 0,
    },
    symbol: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '拐点形状',
      },
      'x-component': 'Select',
      enum: symbolTyles,
      default: 'circle',
    },
    symbolOffset: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackText: '位置偏移',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '[x,y]',
      },
      default: '[0,0]',
    },
  },
};
