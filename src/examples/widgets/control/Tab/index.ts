import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TabSchema } from './schema';

export const Tab = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '控件.Tab切换',
    cover: '/menuCover/控件/Tab切换.png',
    schema: TabSchema,
    h: 44,
    w: 220,
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
  }
);
