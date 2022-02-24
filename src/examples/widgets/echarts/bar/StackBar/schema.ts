import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { barSeriesStyleSchema } from '@/examples/schema/echarts/barSeriesStyleSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { barSeriesSchema } from '@/examples/schema/echarts/series/barSeriesSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { xAxisSchema } from '@/examples/schema/echarts/xAxisSchema';
import { yAxisSchema } from '@/examples/schema/echarts/yAxisSchema';
import { ISchema } from '@formily/react';

export const StackBarSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    xAxis: xAxisSchema({ boundaryGap: true }),
    yAxis: yAxisSchema,
    tooltip: tooltipSchema,
    legend: legendSchema,
    animation: animationSchema,
    barSeriesStyle: barSeriesStyleSchema({
      borderRadius: { leftTop: 50, rightTop: 50, leftbottom: 50, rightbottom: 50, barCategoryGap: 80 },
      barWidth: 18,
      backgroundStyle: {
        show: true,
        color: 'rgba(0, 0, 0, 0)',
        borderWidth: 1,
        borderColor: '#4a5056',
        borderRadius: 50,
      },
    }),
    series: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 5,
      'x-component-props': {
        title: '系列',
        listType: 'bar',
      },
      default: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      items: barSeriesSchema,
    },
  },
};
