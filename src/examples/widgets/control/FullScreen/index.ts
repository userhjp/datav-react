import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { FullScreenSchema } from './schema';

export const FullScreen = React.lazy(() => import('./preview'));

registerWidgetConfig(FullScreen, {
  schema: FullScreenSchema,
  h: 80,
  w: 80,
  events: {
    changed: {
      description: '当全屏切换时',
      fields: {
        isFullScreen: '是否全屏',
      },
    },
  },
});
