import { ISchema } from '@formily/react';
import { fontFamilys, fontStyles, fontWeights } from '../../shared';

export const textSchema: ISchema = {
  type: 'object',
  properties: {
    fontFamily: {
      type: 'string',
      title: '字体',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: fontFamilys,
      default: 'Microsoft Yahei',
    },
    fontSize: {
      type: 'number',
      title: '字号',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 12,
      },
      default: 16,
    },
    fontWeight: {
      type: 'string',
      title: '字体粗细',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: fontWeights,
      default: 'normal',
    },
    color: {
      type: 'string',
      title: '字体颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      enum: fontWeights,
      default: '#fff',
    },
  },
};
