import { ISchema } from '@formily/react';

/** 漏斗图 Series 配置*/
export const funnelSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '漏斗图样式',
  },
  properties: {
    type: {
      default: 'funnel',
    },
    voidMimMax: {
      type: 'void',
      title: '指定数据值',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        min: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最小值',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        max: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最大值',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 100,
        },
      },
    },
    voidMimMaxSize: {
      type: 'void',
      title: '值映射宽度',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        minSize: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最小值',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            min: 0,
          },
          default: '0%',
        },
        maxSize: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最大值',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            min: 0,
          },
          default: '100%',
        },
      },
    },
    sort: {
      title: '排序方式',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        { value: 'descending', label: '升序' },
        { value: 'ascending', label: '降序' },
      ],
      default: 'descending',
    },
    gap: {
      title: '图形间距',
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 0,
    },
  },
};
