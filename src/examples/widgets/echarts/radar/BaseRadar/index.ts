import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseRadarSchema } from './schema';

export const BaseRadar = React.lazy(() => import('./preview'));

registerWidgetConfig(BaseRadar, {
  w: 420,
  h: 260,
  schema: BaseRadarSchema,
  data: {
    value: {
      indicator: [
        {
          name: '特殊人群',
          max: 100,
        },
        {
          name: '信访',
          max: 100,
        },
        {
          name: '12345',
          max: 100,
        },
        {
          name: '事件',
          max: 100,
        },
        {
          name: '矛盾调解',
          max: 100,
        },
        {
          name: '人民调解',
          max: 100,
        },
      ],
      data: [
        {
          name: '预算分配',
          value: [20, 50, 60, 60, 90, 80],
        },
      ],
    },
    fields: {
      indicator: '维度',
      data: '数据组',
    },
  },
});
