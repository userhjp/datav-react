import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { textSchema } from '@/examples/schema/textSchema';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';
import { echartTitleSchema } from '@/examples/schema/echarts/echartTitleSchema';
import { fontWeights } from '@/examples/shared';

export const RosePieSchema: ISchema = {
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
    title: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '类别标题',
        switch: true,
        defaultSwitch: true,
        noPadding: true,
      },
      properties: {
        nameStyle: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          'x-component-props': {
            title: '标题名称',
            switch: true,
            defaultSwitch: true,
          },
          properties: {
            name: {
              type: 'string',
              title: '名称',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入',
                min: 0,
              },
              default: '总量',
            },
            padding: {
              type: 'string',
              title: '间距',
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                min: 0,
              },
              default: 10,
            },
            voidTextStyle: textSchema(),
          },
          default: {
            textStyle: {
              fontSize: 14,
              color: '#fefefe',
            },
          },
        },
        valueStyle: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          'x-component-props': {
            title: '数值样式',
            switch: true,
            defaultSwitch: true,
          },
          properties: {
            voidTextStyle: textSchema(),
          },
          default: {
            textStyle: {
              fontSize: 32,
              fontWeight: 'bolder',
              color: '#fefefe',
            },
          },
        },
      },
    },
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
    textStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '文本样式',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        voidTextStyle: textSchema(),
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
        voidTextStyle: textSchema(),
      },
    },
  },
};
