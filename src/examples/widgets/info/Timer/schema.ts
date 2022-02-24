import { fontFamilys, fontWeights } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const TimerSchema: ISchema = {
  type: 'object',
  properties: {
    iconStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        header: '图标样式',
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
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        key: '1',
        header: '文本样式',
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
          default: 22,
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
  },
};
