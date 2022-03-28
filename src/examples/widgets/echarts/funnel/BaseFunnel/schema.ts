import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { funnelSeriesStyleSchema } from '@/examples/schema/echarts/funnelSeriesStyleSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';
import { colorsSchema } from '@/examples/schema/echarts/colorsSchema';

export const BaseFunnelSchema: ISchema = {
  type: 'object',
  properties: {
    colors: colorsSchema,
    grid: echartGridSchema,
    tooltip: tooltipSchema(),
    legend: legendSchema,
    series: funnelSeriesStyleSchema,
  },
};
