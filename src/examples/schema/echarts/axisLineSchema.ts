import { ISchema } from '@formily/react';
import { lineTypeList } from '../../shared';

/** 轴线 */
export const axisLineSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '轴线',
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    lineStyle: {
      type: 'object',
      title: '轴线样式',
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
            feedbackText: '类型',
          },
          'x-component': 'Select',
          enum: lineTypeList,
          default: 'solid',
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
            min: 1,
          },
          default: 1,
        },
        color: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
  },
};
