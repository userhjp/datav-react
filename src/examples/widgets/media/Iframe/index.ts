import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { IframeSchema } from './schema';

export const Iframe = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.Iframe',
    cover: '/static/menuCover/媒体/iframe.png',
    schema: IframeSchema,
  }
);
