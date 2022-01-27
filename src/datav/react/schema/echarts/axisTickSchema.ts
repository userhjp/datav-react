import { ISchema } from '@formily/react';
import { lineTypeList } from '../../../shared';

/** 轴刻度 */
export const axisTickSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '轴刻度',
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    length: {
      type: 'number',
      title: '长度',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 1,
      },
      default: 5,
    },
    lineStyle: {
      type: 'object',
      title: '刻度样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        type: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '类型',
          },
          'x-component': 'Select',
          enum: lineTypeList,
          default: 'solid',
        },
        width: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '粗细',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 1,
        },
        color: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: 'rgba(233, 228, 228, 0.1)',
        },
      },
    },
  },
};
