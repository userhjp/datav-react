import { animationSchema } from '@/datav/react/schema/echarts/animationSchema';
import { barSeriesStyleSchema } from '@/datav/react/schema/echarts/barSeriesStyleSchema';
import { echartGridSchema } from '@/datav/react/schema/echarts/gridSchema';
import { legendSchema } from '@/datav/react/schema/echarts/legendSchema';
import { lineSeriesStyleSchema } from '@/datav/react/schema/echarts/lineSeriesStyleSchema';
import { tooltipSchema } from '@/datav/react/schema/echarts/tooltipSchema';
import { xAxisSchema } from '@/datav/react/schema/echarts/xAxisSchema';
import { yAxisSchema } from '@/datav/react/schema/echarts/yAxisSchema';
import { WidgetConfig } from '@/datav/interface';
import { lineBarSeriesSchema } from '@/datav/react/schema/echarts/series/lineBarSeriesSchema';

export const config: WidgetConfig = {
  w: 380,
  h: 220,
  attr: {
    type: 'object',
    properties: {
      grid: echartGridSchema,
      xAxis: xAxisSchema({ boundaryGap: true }),
      yAxis: yAxisSchema,
      tooltip: tooltipSchema,
      legend: legendSchema,
      animation: animationSchema,
      lineSeriesStyle: lineSeriesStyleSchema,
      barSeriesStyle: barSeriesStyleSchema(),
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
  },
  data: [
    { x: '2018', y: '上海', v: 70 },
    { x: '2019', y: '上海', v: 55 },
    { x: '2020', y: '上海', v: 50 },
    { x: '2021', y: '上海', v: 30 },
    { x: '2022', y: '上海', v: 50 },

    { x: '2018', y: '深圳', v: 50 },
    { x: '2019', y: '深圳', v: 70 },
    { x: '2020', y: '深圳', v: 60 },
    { x: '2021', y: '深圳', v: 48 },
    { x: '2022', y: '深圳', v: 60 },

    { x: '2018', y: '重庆', v: 30 },
    { x: '2019', y: '重庆', v: 20 },
    { x: '2020', y: '重庆', v: 40 },
    { x: '2021', y: '重庆', v: 68 },
    { x: '2022', y: '重庆', v: 35 },

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
