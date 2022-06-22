import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';
import { legendIcons } from '@/examples/shared';

export const BubbleChartSchema: ISchema = {
  type: 'object',
  default: {
    polarSeriesStyle: {
      color: ['#79daff'],
    },
  },
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema({ axisPointer: true }),
    animation: animationSchema,
    polarSeriesStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '气泡样式',
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
          default: '气泡图',
        },
        symbol: {
          type: 'string',
          title: '散点形状',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: legendIcons,
          default: '',
        },
        symbolSize: {
          type: 'string',
          title: '散点大小',
          'x-decorator': 'FormItem',
          'x-component': 'FunTextArea',
          'x-component-props': {
            funName: '(data)',
          },
          default: 'return Math.sqrt(data.v) * 3;',
        },
        color: seriesColorSchema,
      },
    },
  },
};
