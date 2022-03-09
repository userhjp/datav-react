import { animationSchema } from '@/examples/schema/echarts/animationSchema';
import { axisSchema } from '@/examples/schema/echarts/axisSchema';
import { barSeriesStyleSchema } from '@/examples/schema/echarts/barSeriesStyleSchema';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { barSeriesSchema } from '@/examples/schema/echarts/series/barSeriesSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';

export const YCategoryBarSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    xAxis: axisSchema('value', 'X轴'),
    yAxis: axisSchema('category', 'Y轴'),
    tooltip: tooltipSchema({ axisPointer: true }),
    legend: legendSchema,
    animation: animationSchema,
    barSeriesStyle: barSeriesStyleSchema,
    series: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 5,
      'x-component-props': {
        title: '系列',
        listType: 'bar',
      },
      default: [
        { type: 'bar', itemStyle: { gradientDirection: 'horizontal' } },
        { type: 'bar', itemStyle: { gradientDirection: 'horizontal' } },
        { type: 'bar', itemStyle: { gradientDirection: 'horizontal' } },
      ],
      items: barSeriesSchema,
    },
  },
  default: {
    yAxis: {
      axisLabel: {
        margin: 20,
      },
    },
    grid: {
      top: 40,
      bottom: 40,
    },
    barSeriesStyle: {
      label: {
        position: 'right',
      },
    },
  },
};
