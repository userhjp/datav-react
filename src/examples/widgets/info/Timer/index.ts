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
  }
);
