import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { textSchema } from '@/examples/schema/textSchema';

export const PercentagePieSchema: ISchema = {
  type: 'object',
  default: {
    valueStyle: {
      textStyle: {
        fontSize: 30,
        fontWeight: 'bolder',
      },
    },
  },
  properties: {
    grid: echartGridSchema,
    textStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '文本样式',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        textStyle: textSchema,
      },
    },
    valueStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '百分比值',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        textStyle: textSchema,
      },
    },
    innerBorderColor: {
      type: 'string',
      title: '内边框颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: '#5269EE',
    },
    outerBorderColor: {
      type: 'string',
      title: '外边框颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: '#5269EE',
    },
  },
};
