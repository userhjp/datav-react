import { ISchema } from '@formily/react';
import { lineStyles } from '../../shared';
import { textSchema } from '../textSchema';

/** 提示框组件 */
export const tooltipSchema = ({ axisPointer } = { axisPointer: false }): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '提示框',
    switch: true,
    defaultSwitch: true,
  },
  default: {
    textStyle: {
      fontSize: 14,
      color: '#fff',
    },
  },
  properties: {
    textStyle: {
      type: 'object',
      properties: {
        fontSize: textSchema,
      },
    },
    bgVoid: {
      type: 'void',
      title: '弹框背景',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        verticalPadding: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '水平边距',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 5,
        },
        horizontalPadding: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '垂直边距',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 5,
        },
        backgroundColor: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '背景色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0.65)',
        },
      },
    },
    axisPointer: axisPointer
      ? {
          type: 'object',
          'x-component': 'MyFormCollapse',
          'x-component-props': {
            title: '轴指示器',
            switch: true,
            defaultSwitch: true,
          },
          properties: {
            lineStyle: {
              type: 'object',
              title: '线型样式',
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
                  enum: lineStyles,
                  default: 'dashed',
                },
                width: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '粗细',
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
                    feedbackText: '颜色',
                    gridSpan: 2,
                  },
                  'x-component': 'ColorPicker',
                  default: '#f5dc69',
                },
                dashedLength: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '长度',
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
                    feedbackText: '间距',
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
        }
      : null,
  },
});
