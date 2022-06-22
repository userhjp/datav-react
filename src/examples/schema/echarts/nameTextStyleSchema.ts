import { ISchema } from '@formily/react';
import { titleLocations } from '../../shared';
import { textSchema } from '../textSchema';

/** 轴标题 */
export const nameTextStyleSchema = {
  type: 'void',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '轴标题',
  },
  properties: {
    name: {
      type: 'string',
      title: '标题',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
      },
      default: '',
    },
    nameLocation: {
      type: 'string',
      title: '位置',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: titleLocations,
      default: 'end',
    },
    displayMode: {
      type: 'void',
      title: '展示方式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        nameRotate: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '旋转',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: '度',
            min: 0,
          },
          default: 0,
        },
        nameGap: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '偏移',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 15,
        },
      },
    },
    nameTextStyle: {
      type: 'object',
      properties: {
        padding: {
          type: 'array',
          title: '标题边距',
          'x-decorator': 'FormItem',
          'x-component': 'PaddingArr',
          default: [0, 10, 0, 0],
        },
        voidTextStyle: textSchema('void'),
      },
    },
  },
};
