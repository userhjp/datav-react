import { ISchema } from '@formily/react';
import { AnimationEasing, lineTypeList } from '../../../shared';

/** 动画 */
export const animationSchema: ISchema = {
  type: 'void',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '动画',
    switch: true,
    defaultSwitch: true,
    mapSwitchKey: 'animation',
  },
  properties: {
    animationDuration: {
      type: 'number',
      title: '动画时长',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'ms',
        min: 200,
      },
      default: 1000,
    },
    animationEasing: {
      type: 'string',
      title: '缓动效果',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: AnimationEasing,
      default: 'cubicOut',
    },
    animationDelay: {
      type: 'number',
      title: '延迟',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'ms',
        min: 0,
      },
      default: 0,
    },
  },
};
