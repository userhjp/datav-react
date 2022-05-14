import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const TextLabelSchema: ISchema = {
  type: 'object',
  default: {
    fontSize: 22,
    color: '#fff',
  },
  properties: {
    config: {
      type: 'object',
      // 'x-component': 'MyFormCollapse',
      // 'x-component-props': {
      //   title: '全局',
      // },
      properties: {
        autolayout: {
          type: 'boolean',
          title: '自动布局',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: false,
        },
        padding: {
          type: 'object',
          title: '内容边距',
          'x-decorator': 'FormItem',
          'x-reactions': {
            dependencies: ['.autolayout'],
            fulfill: {
              state: {
                visible: '{{$deps[0]}}',
              },
            },
          },
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            vertical: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '上下',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 2,
            },
            horizontal: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '左右',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 3,
            },
          },
        },
        layout: {
          type: 'object',
          title: '标签布局',
          'x-decorator': 'FormItem',
          'x-reactions': {
            dependencies: ['.autolayout'],
            fulfill: {
              state: {
                visible: '{{!$deps[0]}}',
              },
            },
          },
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            row: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '行数',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: '行',
                min: 0,
              },
              default: 3,
            },
            col: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '列数',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: '列',
                min: 0,
              },
              default: 2,
            },
          },
        },
        space: {
          type: 'object',
          title: '标签间距',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            rowSpace: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '行间距',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 6,
            },
            colSpace: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '列间距',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 6,
            },
          },
        },
      },
    },
    labelConfig: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '默认标签配置',
      },
      properties: {
        filletRadius: {
          type: 'number',
          title: '圆角半径',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgb(10, 115, 255)',
        },
        textStyle: textSchema('object'),
      },
    },
    statusList: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '标签系列',
        listType: 'column',
      },
      default: [{ labelName: 'series1', backgroundColor: 'rgb(121, 218, 255)', color: 'rgba(0,0,0,0.8)' }],
      items: {
        type: 'object',
        properties: {
          labelName: {
            type: 'string',
            title: '标签类别名',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '需要与数据中字段 type 匹配',
              tooltipLayout: 'text',
            },
            'x-component': 'Input',
            default: 'series1',
          },
          backgroundColor: {
            type: 'string',
            title: '背景颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            default: 'rgb(121, 218, 255)',
          },
          textStyle: textSchema(),
        },
      },
    },
  },
};
