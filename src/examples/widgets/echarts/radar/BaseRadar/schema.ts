import { ISchema } from '@formily/react';
import { echartGridSchema } from '@/examples/schema/echarts/gridSchema';
import { tooltipSchema } from '@/examples/schema/echarts/tooltipSchema';
import { radarSchema } from '@/examples/schema/echarts/radarSchema';
import { radarSeriesStyleSchema } from '@/examples/schema/echarts/radarSeriesStyleSchema';

export const BaseRadarSchema: ISchema = {
  type: 'object',
  default: {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  properties: {
    grid: echartGridSchema,
    tooltip: tooltipSchema(),
    radar: radarSchema,
    radarSeries: radarSeriesStyleSchema,
  },
};
