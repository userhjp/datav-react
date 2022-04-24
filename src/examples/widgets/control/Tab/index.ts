import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TabSchema } from './schema';

export const Tab = React.lazy(() => import('./preview'));

registerWidgetConfig(Tab, {
  schema: TabSchema,
  h: 44,
  w: 300,
  data: {
    value: [
      {
        label: '按钮1',
        value: '1',
      },
      {
        label: '按钮2',
        value: '2',
      },
      {
        label: '按钮3',
        value: '3',
      },
    ],
    fields: {
      label: '标题',
      value: '值',
    },
  },
  events: {
    changed: {
      description: '当Tab切换时',
      fields: {
        value: '选中值',
      },
    },
  },
});
