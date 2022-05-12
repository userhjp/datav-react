import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';
import { images } from './data';

export const TrendSchema: ISchema = {
  type: 'object',
  default: {
    fontSize: 22,
    color: '#fff',
  },
  properties: {
    titleStyle: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '标题',
      },
      properties: {
        content: {
          type: 'string',
          title: '标题内容',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          default: '标题',
        },
        textStyle: textSchema('object', '内容样式'),
        isWrap: {
          type: 'boolean',
          title: '标题换行',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: '标题字数过多时，可换行',
            tooltipLayout: 'text',
          },
          'x-component': 'Switch',
          default: true,
        },
      },
    },
    iconStyle: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '图标',
      },
      properties: {
        image: {
          type: 'string',
          title: '图片选择',
          'x-decorator': 'FormItem',
          'x-component': 'ImageSelect',
          enum: images,
          default: 'icon1',
        },
        size: {
          type: 'number',
          title: '图标大小',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 20,
        },
        iconColor: {
          type: 'void',
          title: '图标颜色',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            flatColor: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '持平',
                gridSpan: 2,
              },
              'x-component': 'ColorPicker',
              default: 'orange',
            },
            upColor: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '上升',
              },
              'x-component': 'ColorPicker',
              default: '#db422a',
            },
            downColor: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '下降',
              },
              'x-component': 'ColorPicker',
              default: 'green',
            },
          },
        },
        isWrap: {
          type: 'boolean',
          title: '同步文字颜色',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
      },
    },
    numStyle: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '数值',
      },
      properties: {
        textStyle: textSchema('object', '数值样式'),
        rounding: {
          type: 'boolean',
          title: '值四舍五入',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        baseNum: {
          type: 'number',
          title: '基础值',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: "以此数值作为基础，来计算图标走势，默认以'0'为基础值（优先使用数据中的初始值）",
            tooltipLayout: 'text',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        thousandth: {
          type: 'number',
          title: '千分位',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: '分隔符最长一位，超出一位时取第一位，无法以数字作为分隔符。',
            tooltipLayout: 'text',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            maxLength: 1,
          },
          default: ',',
        },
        suffix: {
          type: 'number',
          title: '数值后缀',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '%',
        },
      },
    },
  },
};
