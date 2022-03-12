import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DecorateSchema } from './schema';

export const Decorate = React.lazy(() => import('./preview'));

registerWidgetConfig(Decorate, {
  h: 30,
  schema: DecorateSchema,
});
