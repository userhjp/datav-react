import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { barSeriesSymbolSchema } from '@/examples/schema/echarts/barSeriesSymbolSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { barSeriesSchema } from '@/examples/schema/echarts/series/barSeriesSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';

export const ZebraBarSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema,
    legend: legendSchema,
    animation: animationSchema,
    barSeriesStyle: barSeriesSymbolSchema,
    series: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 5,
      'x-component-props': {
        title: '系列',
        listType: 'bar',
      },
      default: [{ type: 'pictorialBar' }, { type: 'pictorialBar' }, { type: 'pictorialBar' }],
      items: barSeriesSchema,
    },
  },
};
