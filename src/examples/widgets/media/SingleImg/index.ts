import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { SingleImgSchema } from './schema';

export const SingleImg = React.lazy(() => import('./preview'));

registerWidgetConfig(SingleImg, {
  taxonPath: '媒体.单张图片',
  cover: '/menuCover/媒体/单张图片.png',
  schema: SingleImgSchema,
});
