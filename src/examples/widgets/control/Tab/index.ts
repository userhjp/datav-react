import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TabSchema } from './schema';

export const Tab = React.lazy(() => import('./preview'));

registerWidgetConfig(Tab, {
  schema: TabSchema,
  h: 40,
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
