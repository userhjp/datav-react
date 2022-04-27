import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { IframeSchema } from './schema';

export const Iframe = React.lazy(() => import('./preview'));

registerWidgetConfig(Iframe, {
  taxonPath: '媒体.Iframe',
  cover: '/menuCover/媒体/iframe.png',
  schema: IframeSchema,
});
