import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { NumberFlopSchema } from './schema';

export const NumberFlop = React.lazy(() => import('./preview'));

registerWidgetConfig(NumberFlop, {
  schema: NumberFlopSchema,
  w: 350,
  h: 70,
  data: {
    value: {
      title: '',
      value: 123457,
    },
    fields: {
      title: '标题',
      value: '值',
    },
  },
});
