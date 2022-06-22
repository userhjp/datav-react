import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BubbleChartSchema } from './schema';

export const BubbleChart = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.散点图.气泡图',
    cover: '/menuCover/图表/散点图/气泡图.png',
    w: 550,
    h: 350,
    schema: BubbleChartSchema,
    data: {
      value: [
        { x: 'A', v: 60 },
        { x: 'B', v: 36 },
        { x: 'C', v: 50 },
        { x: 'D', v: 80 },
        { x: 'E', v: 15 },
      ],
      fields: {
        x: '类目',
        v: '值',
      },
    },
  }
);
