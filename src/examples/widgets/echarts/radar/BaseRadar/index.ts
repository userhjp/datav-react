import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseRadarSchema } from './schema';

export const BaseRadar = React.lazy(() => import('./preview'));

registerWidgetConfig(BaseRadar, {
  w: 550,
  h: 350,
  schema: BaseRadarSchema,
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
