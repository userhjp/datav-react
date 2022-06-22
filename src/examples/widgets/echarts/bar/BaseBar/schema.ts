import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { ISchema } from '@formily/react';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';
import { labelSchema } from '@/examples/schema/echarts/labelSchema';

export const BaseBarSchema: ISchema = {
  type: 'object',
  default: {
    barSeriesStyle: {
      color: ['#1179ff', '#79daff'],
    },
  },
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema({ axisPointer: true }),
    animation: animationSchema,
    barSeriesStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '柱条样式',
      },
      properties: {
        name: {
          type: 'string',
          title: '系列名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '基础柱状图',
        },
        barWidth: {
          type: 'number',
          title: '柱条宽度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            autoValue: 18,
            placeholder: '自适应',
            unit: 'px',
            min: 0,
          },
          default: 18,
        },
        borderRadius: {
          type: 'object',
          title: '柱条圆角',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            leftTop: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '左上',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            rightTop: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '右上',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            leftbottom: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '左下',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            rightbottom: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '右下',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
          },
        },
        label: labelSchema,
        backgroundStyle: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          'x-component-props': {
            title: '柱条背景',
            switch: true,
            defaultSwitch: true,
          },
          properties: {
            color: {
              type: 'string',
              title: '背景颜色',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              default: 'rgba(180, 180, 180, 0.2)',
            },
            borderColor: {
              type: 'string',
              title: '描边颜色',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              default: '#000',
            },
            borderWidth: {
              type: 'number',
              title: '描边宽度',
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            borderRadius: {
              type: 'number',
              title: '背景圆角',
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
          },
        },
        color: seriesColorSchema,
      },
    },
  },
};
