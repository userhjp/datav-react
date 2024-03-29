import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const CountDownSchema: ISchema = {
  type: 'object',
  default: {
    fontSize: 48,
    color: '#fff',
  },
  properties: {
    flop: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '翻牌器模式',
        switch: true,
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '卡牌背景',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#000',
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#000',
        },
      },
    },
    format: {
      type: 'string',
      title: '格式化',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '如：HH:mm:ss:SSS 、D 天 H 时 m 分 s 秒',
        tooltipLayout: 'text',
      },
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['.flop'],
        fulfill: {
          state: {
            visible: '{{$deps[0] && !$deps[0].show}}',
          },
        },
      },
      default: 'D 天 HH:mm:ss',
    },
    voidTextStyle: textSchema(),
  },
};
