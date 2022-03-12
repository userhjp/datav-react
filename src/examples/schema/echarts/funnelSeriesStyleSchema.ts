import { echartsFunnelLablePositions, fontWeights } from '@/examples/shared';
import { ISchema } from '@formily/react';
import { textSchema } from '../textSchema';

/** 漏斗图 Series 配置*/
export const funnelSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '漏斗图样式',
    noPadding: true,
    switch: true,
    defaultSwitch: true,
    isOpen: true,
  },
  properties: {
    type: {
      default: 'funnel',
    },
    label: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '文本标签',
        switch: true,
        defaultSwitch: true,
      },
      default: {
        fontSize: 10,
        color: '#000',
      },
      properties: {
        position: {
          type: 'string',
          title: '位置',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: echartsFunnelLablePositions,
          default: 'inside',
        },
        voidTextStyle: textSchema(),
      },
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
          'x-component': 'NumberPicker',
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
          'x-component': 'NumberPicker',
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
    distance: {
      type: 'void',
      title: '图表边距',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        left: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '左',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 60,
        },
        right: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '右',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 60,
        },
        top: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '上',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 40,
        },
        bottom: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '下',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 30,
        },
      },
    },
  },
};
