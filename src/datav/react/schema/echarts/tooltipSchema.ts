import { ISchema } from '@formily/react';
import { fontWeights, lineStyles, lineTypeList } from '../../../shared';

/** 提示框组件 */
export const tooltipSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '提示框',
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    textStyle: {
      type: 'object',
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
          default: 14,
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
          default: '#fff',
        },
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
            extra: '水平边距',
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
            extra: '垂直边距',
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
            extra: '背景色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0.65)',
        },
      },
    },
    axisPointer: {
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
              default: '#f5dc69',
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
    },
  },
};
