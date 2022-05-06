import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { HorizontalScatterSchema } from './schema';

export const HorizontalScatter = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.散点图.气泡图',
    cover: '/menuCover/图表/散点图/气泡图.png',
    w: 550,
    h: 350,
    schema: HorizontalScatterSchema,
    data: {
      value: [
        {
          name: 'A类',
          value: '3720',
        },
        {
          name: 'B类',
          value: '2920',
        },
        {
          name: 'C类',
          value: '2200',
        },
        {
          name: 'D类',
          value: '1420',
        },
        {
          name: 'E类',
          value: '3200',
        },
        {
          name: 'F类',
          value: '2420',
        },
      ],
      fields: {
        name: '分类名称',
        value: '值',
      },
    },
  }
);
