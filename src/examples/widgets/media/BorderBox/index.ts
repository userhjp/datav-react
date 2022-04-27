import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BorderBoxSchema } from './schema';

export const BorderBox = React.lazy(() => import('./preview'));

registerWidgetConfig(BorderBox, {
  taxonPath: '媒体.边框',
  cover: '/menuCover/媒体/边框.png',
  schema: BorderBoxSchema,
});
