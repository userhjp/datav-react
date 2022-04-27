import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { StackLineSchema } from './schema';

export const StackLine = React.lazy(() => import('./preview'));

registerWidgetConfig(StackLine, {
  taxonPath: '图表.折线图.堆叠折线图',
  cover: '/menuCover/图表/折线图/堆叠折线图.png',
  schema: StackLineSchema,
  data: {
    value: [
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
  },
});
