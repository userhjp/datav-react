import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { lineSeriesStyleSchema } from '@/examples/schema/echarts/lineSeriesStyleSchema';
import { seriesColorSchema } from '@/examples/schema/echarts/series/seriesColorSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';

export const BaseLineSchema: ISchema = {
  type: 'object',
  default: {
    xAxis: {
      boundaryGap: false,
    },
    lineSeriesStyle: {
      color: ['#1179ff', '#79daff'],
    },
    grid: {
      right: 30,
    },
  },
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema({ axisPointer: true }),
    animation: animationSchema,
    lineSeriesStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '折线',
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
          default: '基础折线图',
        },
        ...(lineSeriesStyleSchema.properties as any),
        color: seriesColorSchema,
      },
    },
  },
};
