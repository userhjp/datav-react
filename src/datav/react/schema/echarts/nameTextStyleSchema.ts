import { ISchema } from '@formily/react';
import { fontWeights, titleLocations } from '../../../shared';

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
            extra: '旋转',
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
            extra: '偏移',
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
    textStyle: {
      type: 'void',
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
            extra: '字号',
          },
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
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '字体粗细',
          },
          'x-component': 'Select',
          enum: fontWeights,
          default: 'normal',
        },
        color: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '字体颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: '#e6e9ed',
        },
      },
    },
  },
});
