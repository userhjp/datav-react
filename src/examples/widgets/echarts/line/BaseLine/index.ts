import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseLineSchema } from './schema';

export const BaseLine = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.折线图.基础折线图',
    cover: '/menuCover/图表/折线图/基础折线图.png',
    schema: BaseLineSchema,
    data: {
      value: [
        { x: 'A', v: 10 },
        { x: 'B', v: 36 },
        { x: 'C', v: 36 },
        { x: 'D', v: 75 },
        { x: 'E', v: 70 },
        { x: 'F', v: 100 },
      ],
      fields: {
        x: '类目',
        v: '值',
      },
    },
  }
);
