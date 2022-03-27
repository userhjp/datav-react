import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { textSchema } from '@/examples/schema/textSchema';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';
import { echartTitleSchema } from '@/examples/schema/echarts/echartTitleSchema';
import { fontWeights } from '@/examples/shared';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';

export const RosePieSchema: ISchema = {
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
    title: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '图表标题',
        switch: true,
        defaultSwitch: true,
        noPadding: true,
      },
      default: {
        nameStyle: {
          fontSize: 14,
          color: '#fefefe',
        },
        valueStyle: {
          fontSize: 16,
          color: '#fefefe',
        },
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
        paddingBottom: {
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
        nameStyle: textSchema('object', '标题样式'),
        unit: {
          type: 'string',
          title: '数值后缀',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '个',
        },
        valueStyle: textSchema('object', '数值样式'),
      },
    },
    legend: legendSchema,
    series: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '饼图样式',
        noPadding: true,
      },
      properties: {
        labelLine: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          'x-component-props': {
            title: '引导线配置',
            switch: true,
            defaultSwitch: true,
            noPadding: true,
          },
          properties: {
            voidLen: {
              type: 'void',
              title: '线长配置',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-component-props': {
                minColumns: 2,
                rowGap: 0,
              },
              properties: {
                length: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '线一长度',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    min: 0,
                  },
                  default: 20,
                },
                length2: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '线二长度',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    min: 0,
                  },
                  default: 40,
                },
              },
            },
            smooth: {
              type: 'boolean',
              title: '是否平滑',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
              default: false,
            },
          },
        },
      },
    },
  },
};
