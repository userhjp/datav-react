import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DemoSchema } from './schema';

export const Demo = React.lazy(() => import('./preview'));

registerWidgetConfig(Demo, {
  schema: DemoSchema,
  data: {
    value: { title: '标题', value: 23 },
    fields: {
      title: '标题',
      value: '值',
    },
  },
  events: {
    changed: {
      description: '当数据变化时',
    },
  },
});
