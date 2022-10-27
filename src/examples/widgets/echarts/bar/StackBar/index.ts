import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { StackBarSchema } from './schema';

export const StackBar = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.柱状图.垂直胶囊柱状图',
    cover: '/static/menuCover/图表/柱状图/垂直胶囊柱状图.png',
    schema: StackBarSchema,
    data: {
      value: [
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
    },
  }
);
