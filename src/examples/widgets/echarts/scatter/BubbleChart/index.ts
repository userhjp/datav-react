import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BubbleChartSchema } from './schema';

export const BubbleChart = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.散点图.气泡图',
    cover: '/static/menuCover/图表/散点图/气泡图.png',
    schema: BubbleChartSchema,
    data: {
      value: [
        { x: 'A', v: 60 },
        { x: 'B', v: 36 },
        { x: 'C', v: 50 },
        { x: 'D', v: 81 },
        { x: 'E', v: 15 },
      ],
      fields: {
        x: '类目',
        v: '值',
      },
    },
  }
);
