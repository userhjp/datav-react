import { animationSchema } from '@/datav/react/schema/echarts/animationSchema';
import { echartGridSchema } from '@/datav/react/schema/echarts/gridSchema';
import { legendSchema } from '@/datav/react/schema/echarts/legendSchema';
import { lineSeriesStyleSchema } from '@/datav/react/schema/echarts/lineSeriesStyleSchema';
import { tooltipSchema } from '@/datav/react/schema/echarts/tooltipSchema';
import { xAxisSchema } from '@/datav/react/schema/echarts/xAxisSchema';
import { yAxisSchema } from '@/datav/react/schema/echarts/yAxisSchema';
import { WidgetConfig } from '@/datav/interface';
import { lineSeriesSchema } from '@/datav/react/schema/echarts/series/lineSeriesSchema';
import { areaStyleSchema } from '@/datav/react/schema/echarts/areaStyleSchema';

export const config: WidgetConfig = {
  w: 380,
  h: 220,
  attr: {
    type: 'object',
    properties: {
      grid: echartGridSchema,
      xAxis: xAxisSchema({ boundaryGap: false }),
      yAxis: yAxisSchema,
      tooltip: tooltipSchema,
      legend: legendSchema,
      animation: animationSchema,
      areaStyle: areaStyleSchema,
      lineSeriesStyle: lineSeriesStyleSchema,
      series: {
        type: 'array',
        'x-component': 'MyFormCollapse',
        maxItems: 5,
        'x-component-props': {
          title: '系列',
          listType: 'line',
        },
        default: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
        items: lineSeriesSchema,
      },
    },
  },
  data: [
    { x: '2017', y: '上海', v: 85 },
    { x: '2018', y: '上海', v: 50 },
    { x: '2019', y: '上海', v: 89 },
    { x: '2020', y: '上海', v: 48 },
    { x: '2021', y: '上海', v: 25 },
    { x: '2022', y: '上海', v: 49 },

    { x: '2017', y: '深圳', v: 10 },
    { x: '2018', y: '深圳', v: 36 },
    { x: '2019', y: '深圳', v: 36 },
    { x: '2020', y: '深圳', v: 75 },
    { x: '2021', y: '深圳', v: 70 },
    { x: '2022', y: '深圳', v: 100 },

    { x: '2017', y: '重庆', v: 30 },
    { x: '2018', y: '重庆', v: 30 },
    { x: '2019', y: '重庆', v: 20 },
    { x: '2020', y: '重庆', v: 40 },
    { x: '2021', y: '重庆', v: 68 },
    { x: '2022', y: '重庆', v: 35 },

    { x: '2017', y: '成都', v: 40 },
    { x: '2018', y: '成都', v: 40 },
    { x: '2019', y: '成都', v: 25 },
    { x: '2020', y: '成都', v: 50 },
    { x: '2021', y: '成都', v: 60 },
    { x: '2022', y: '成都', v: 48 },
  ],
  fields: {
    x: '类目',
    y: '系列',
    v: '值',
  },
};

export default config;
