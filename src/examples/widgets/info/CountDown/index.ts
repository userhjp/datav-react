import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { CountDownSchema } from './schema';

export const CountDown = React.lazy(() => import('./preview'));

registerWidgetConfig(CountDown, {
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
});
