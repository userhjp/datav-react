import { ISchema } from '@formily/react';
import { lineStyles } from '../../../shared';

/** 网格线 */
const splitLineSchema = (defaultSwitch = false): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '网格线',
    switch: true,
    defaultSwitch,
  },
  properties: {
    lineStyle: {
      type: 'object',
      title: '分隔线样式',
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
          enum: lineStyles,
          default: 'dashed',
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
            min: 0,
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
        dashedLength: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '长度',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 4,
          'x-reactions': {
            dependencies: ['.type'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "dashed"}}',
              },
            },
          },
        },
        dashedSpace: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '间距',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 4,
          'x-reactions': {
            dependencies: ['.type'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "dashed"}}',
              },
            },
          },
        },
      },
    },
  },
});

export { splitLineSchema };
