import { animationSchema } from '@/datav/react/schema/echarts/animationSchema';
import { barSeriesSchema } from '@/datav/react/schema/echarts/series/barSeriesSchema';
import { barSeriesStyleSchema } from '@/datav/react/schema/echarts/barSeriesStyleSchema';
import { echartGridSchema } from '@/datav/react/schema/echarts/gridSchema';
import { legendSchema } from '@/datav/react/schema/echarts/legendSchema';
import { tooltipSchema } from '@/datav/react/schema/echarts/tooltipSchema';
import { xAxisSchema } from '@/datav/react/schema/echarts/xAxisSchema';
import { yAxisSchema } from '@/datav/react/schema/echarts/yAxisSchema';
import { WidgetConfig } from '@/datav/react/interface';

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
  },
  data: [
    { x: '2018', y: '上海', v: 30 },
    { x: '2019', y: '上海', v: 75 },
    { x: '2020', y: '上海', v: 20 },
    { x: '2021', y: '上海', v: 50 },
    { x: '2022', y: '上海', v: 70 },

    { x: '2018', y: '深圳', v: 70 },
    { x: '2019', y: '深圳', v: 60 },
    { x: '2020', y: '深圳', v: 80 },
    { x: '2021', y: '深圳', v: 68 },
    { x: '2022', y: '深圳', v: 40 },

    { x: '2018', y: '重庆', v: 50 },
    { x: '2019', y: '重庆', v: 40 },
    { x: '2020', y: '重庆', v: 40 },
    { x: '2021', y: '重庆', v: 88 },
    { x: '2022', y: '重庆', v: 55 },

    { x: '2018', y: '成都', v: 60 },
    { x: '2019', y: '成都', v: 45 },
    { x: '2020', y: '成都', v: 70 },
    { x: '2021', y: '成都', v: 80 },
    { x: '2022', y: '成都', v: 30 },
  ],
  fields: {
    x: '类目',
    y: '系列',
    v: '值',
  },
};

export default config;
