import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { areaStyleSchema } from '@/examples/schema/echarts/areaStyleSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { lineSeriesStyleSchema } from '@/examples/schema/echarts/lineSeriesStyleSchema';
import { lineSeriesSchema } from '@/examples/schema/echarts/series/lineSeriesSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';

export const BaseLineSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('category', 'X轴'),
    yAxis: axisSchema('value', 'Y轴'),
    tooltip: tooltipSchema({ axisPointer: true }),
    legend: legendSchema,
    animation: animationSchema,
    areaStyle: areaStyleSchema(false),
    lineSeriesStyle: lineSeriesStyleSchema,
    series: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 5,
      'x-component-props': {
        title: '系列',
        listType: 'line',
      },
      default: [{ type: 'line' }, { type: 'line' }],
      items: lineSeriesSchema,
    },
  },
  default: {
    xAxis: {
      boundaryGap: false,
    },
  },
};
