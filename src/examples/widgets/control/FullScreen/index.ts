import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { FullScreenSchema } from './schema';

export const FullScreen = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '控件.全屏切换',
    cover: '/static/menuCover/控件/全屏切换.png',
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
  }
);
