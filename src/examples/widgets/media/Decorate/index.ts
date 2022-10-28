import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DecorateSchema } from './schema';

export const Decorate = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.装饰条',
    cover: '/menuCover/媒体/装饰.png',
    h: 30,
    schema: DecorateSchema,
  }
);
