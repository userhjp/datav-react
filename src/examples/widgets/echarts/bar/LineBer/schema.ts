import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { barSeriesStyleSchema } from '@/examples/schema/echarts/barSeriesStyleSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { lineSeriesStyleSchema } from '@/examples/schema/echarts/lineSeriesStyleSchema';
import { lineBarSeriesSchema } from '@/examples/schema/echarts/series/lineBarSeriesSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { ISchema } from '@formily/react';

export const LineBerSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema,
    legend: legendSchema,
    animation: animationSchema,
    lineSeriesStyle: lineSeriesStyleSchema,
    barSeriesStyle: barSeriesStyleSchema,
    series: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 5,
      'x-component-props': {
        title: '系列',
        listType: 'line',
      },
      default: [{ type: 'bar' }, { type: 'bar' }, { type: 'line' }],
      items: lineBarSeriesSchema,
    },
  },
};
