import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { legendSchema } from '@/examples/schema/echarts/legendSchema';
import { funnelSeriesStyleSchema } from '@/examples/schema/echarts/funnelSeriesStyleSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { ISchema } from '@formily/react';

export const BaseFunnelSchema: ISchema = {
  type: 'object',
  properties: {
    grid: echartGridSchema,
    tooltip: tooltipSchema(),
    legend: legendSchema,
    series: funnelSeriesStyleSchema,
  },
};
