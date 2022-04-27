import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BgBoxSchema } from './schema';

export const BgBox = React.lazy(() => import('./preview'));

registerWidgetConfig(BgBox, {
  taxonPath: '媒体.自定义背景块',
  cover: '/menuCover/媒体/自定义背景块.png',
  schema: BgBoxSchema,
});
