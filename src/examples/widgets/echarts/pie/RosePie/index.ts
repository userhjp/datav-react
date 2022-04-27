import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { RosePieSchema } from './schema';

export const RosePie = React.lazy(() => import('./preview'));

registerWidgetConfig(RosePie, {
  taxonPath: '图表.饼图.分类玫瑰图',
  cover: '/menuCover/图表/饼图/分类玫瑰图.png',
  w: 550,
  h: 350,
  schema: RosePieSchema,
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
});
