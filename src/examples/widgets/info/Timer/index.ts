import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TimerSchema } from './schema';

export const Timer = React.lazy(() => import('./preview'));

registerWidgetConfig(Timer, {
  schema: TimerSchema,
  w: 300,
  h: 56,
});
