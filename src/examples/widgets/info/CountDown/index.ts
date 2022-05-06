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
        value: 1000 * 60 * 60 * 24,
      },
      fields: {
        value: '倒计时（秒）',
      },
    },
  }
);
