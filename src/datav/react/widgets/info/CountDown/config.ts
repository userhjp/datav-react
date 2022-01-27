import { WidgetConfig } from '@/datav/interface';
import { fontFamilys, fontWeights } from '../../../../shared';

export const Config: WidgetConfig = {
  w: 480,
  h: 150,
  fields: {
    value: '倒计时（秒）',
  },
  data: {
    value: 1000 * 60 * 60 * 24,
  },
  attr: {
    type: 'object',
    properties: {
      textStyle: {
        type: 'void',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '文本样式',
        },
        properties: {
          fontFamily: {
            type: 'string',
            title: '字体',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: fontFamilys,
            default: 'Microsoft Yahei',
          },
          fontSize: {
            type: 'number',
            title: '字号',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入',
              unit: 'px',
              min: 12,
            },
            default: 48,
          },
          fontWeight: {
            type: 'string',
            title: '字体粗细',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: fontWeights,
            default: 'normal',
          },
          color: {
            type: 'string',
            title: '字体颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            default: '#fff',
          },
        },
      },
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
            default: '#fff',
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
              visible: '{{!$deps[0].show}}',
            },
          },
        },
        default: 'HH:mm:ss:SSS',
      },
    },
  },
};

export default Config;
