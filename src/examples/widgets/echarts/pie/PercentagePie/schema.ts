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
  },
  properties: {
    grid: echartGridSchema,
    pieStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '饼图样式',
        noPadding: true,
      },
      properties: {
        color: seriesColorSchema,
      },
      default: {
        color: ['#75d6ff', '#1179ff'],
      },
    },
    outerPie: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '外环装饰',
        switch: true,
      },
      properties: {
        borderWidth: {
          type: 'number',
          title: '边框宽度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 1,
        },
        color: {
          type: 'string',
          // title: '背景色',
          // 'x-decorator': 'FormItem',
          // 'x-component': 'ColorPicker',
          default: 'rgba(66, 66, 66, .1)',
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#1179ff',
        },
      },
    },
    innerPie: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '内环装饰',
        switch: true,
      },
      properties: {
        borderWidth: {
          type: 'number',
          title: '边框宽度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 1,
        },
        color: {
          type: 'string',
          title: '背景色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(66, 66, 66, .1)',
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#1179ff',
        },
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
      default: {
        color: '#fff',
        fontSize: 14,
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
      default: {
        color: '#fff',
        fontSize: 18,
      },
      properties: {
        textStyle: textSchema,
      },
    },
  },
};
