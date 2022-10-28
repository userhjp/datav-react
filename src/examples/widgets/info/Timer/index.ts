import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TimerSchema } from './schema';

export const Timer = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.时间器',
    cover: '/menuCover/信息/时间器.png',
    schema: TimerSchema,
    w: 300,
    h: 56,
    events: {
      changed: {
        description: '当时间变化时',
        fields: {
          time: '当前时间',
        },
      },
      changed2: {
        description: '当时间到设置时间时',
        fields: {
          time: '当前时间',
        },
      },
    },
  }
);
