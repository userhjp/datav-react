import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { SingleImgSchema } from './schema';

export const SingleImg = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.单张图片',
    cover: '/menuCover/媒体/单张图片.png',
    schema: SingleImgSchema,
  }
);
