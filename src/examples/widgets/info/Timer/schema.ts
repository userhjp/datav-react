import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const TimerSchema: ISchema = {
  type: 'object',
  default: {
    fontSize: 22,
    color: '#fff',
  },
  properties: {
    iconStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '图标样式',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        size: {
          type: 'number',
          title: '大小',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 1,
          },
          default: 22,
        },
        color: {
          type: 'string',
          title: '颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#008bff',
        },
        marginRight: {
          type: 'number',
          title: '边距',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 8,
        },
      },
    },
    textStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        key: '1',
        title: '文本样式',
      },
      properties: {
        voidTextStyle: textSchema(),
      },
    },
    format: {
      type: 'string',
      title: '格式化',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '如：HH:mm:ss为12小时制格式',
        tooltipLayout: 'text',
      },
      'x-component': 'Input',
      default: 'yyyy-MM-dd HH:mm:ss',
    },
    timing: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '定时回调设置',
        switch: true,
      },
      properties: {
        time: {
          type: 'number',
          title: '回调抛出间隔',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'ms',
            min: 1000,
          },
          default: 3000,
        },
      },
    },
    fixedPoint: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '定点回调设置',
        switch: true,
      },
      properties: {
        time: {
          type: 'number',
          title: '定点抛出时间',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: '表示一个需包含日期的时间字符串，该字符串应该能被 Date.parse() 方法正确识别。',
            tooltipLayout: 'text',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '2022-11-11 00:00:00',
        },
      },
    },
  },
};
