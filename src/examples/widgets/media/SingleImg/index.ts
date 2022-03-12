import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { SingleImgSchema } from './schema';

export const SingleImg = React.lazy(() => import('./preview'));

registerWidgetConfig(SingleImg, {
  schema: SingleImgSchema,
});
