import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseBarSchema } from './schema';

export const BaseBar = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.柱状图.基础柱状图',
    cover: '/static/menuCover/图表/柱状图/基础柱状图.png',
    schema: BaseBarSchema,
    data: {
      value: [
        { x: 'A', v: 65 },
        { x: 'B', v: 50 },
        { x: 'C', v: 80 },
        { x: 'D', v: 90 },
        { x: 'E', v: 55 },
      ],
      fields: {
        x: '类目',
        v: '值',
      },
    },
  }
);
