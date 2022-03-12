import { ISchema } from '@formily/react';
import { fontWeights, titleLocations } from '../../shared';
import { textSchema } from '../textSchema';

/** 轴标题 */
export const nameTextStyleSchema = (defaultSwitch = true, title = '轴标题'): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '轴标题',
    switch: true,
    defaultSwitch,
  },
  properties: {
    name: {
      type: 'string',
      title,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
      },
      default: '标题',
    },
    nameLocation: {
      type: 'string',
      title: '位置',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: titleLocations,
      default: 'start',
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
        axisNameGap: {
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
    voidTextStyle: textSchema(),
  },
});
