import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BorderBoxSchema } from './schema';

export const BorderBox = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.边框',
    cover: '/static/menuCover/媒体/边框.png',
    schema: BorderBoxSchema,
  }
);
