import { ISchema } from '@formily/react';
import { fontFamilys, fontWeights } from '../shared';

export const textSchema = (type: 'object' | 'void' = 'void', title = '文本样式'): ISchema => ({
  type,
  properties: {
    void: {
      type: 'void',
      title,
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        fontFamily: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体',
          },
          'x-component': 'Select',
          enum: fontFamilys,
          default: 'Microsoft Yahei',
        },
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
            min: 0,
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
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体颜色',
          },
          'x-component': 'ColorPicker',
          default: '#e6e9ed',
        },
      },
    },
  },
});
