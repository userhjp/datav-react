import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { CountDownSchema } from './schema';

export const CountDown = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.倒计时',
    cover: '/menuCover/信息/倒计时.png',
    schema: CountDownSchema,
    w: 480,
    h: 150,
    data: {
      value: {
        endTime: '2020-12-20 00:00:00',
      },
      fields: {
        endTime: '时间',
      },
    },
    events: {
      countdown: {
        description: '当倒计时结束时',
        fields: {
          finish: '倒计时结束',
        },
      },
    },
  }
);
