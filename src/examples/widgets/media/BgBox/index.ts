import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BgBoxSchema } from './schema';

export const BgBox = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.自定义背景块',
    cover: '/static/menuCover/媒体/自定义背景块.png',
    schema: BgBoxSchema,
  }
);
