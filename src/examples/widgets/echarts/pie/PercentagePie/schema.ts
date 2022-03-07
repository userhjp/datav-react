import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { textSchema } from '@/examples/schema/textSchema';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';

export const PercentagePieSchema: ISchema = {
  type: 'object',
  default: {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    valueStyle: {
      textStyle: {
        fontSize: 30,
        fontWeight: 'bolder',
      },
    },
  },
  properties: {
    grid: echartGridSchema,
    pieStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '饼图样式',
      },
      properties: {
        color: seriesColorSchema,
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
      default: {
        color: ['#75d6ff', '#1179ff'],
      },
    },
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
  },
};
