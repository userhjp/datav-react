import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BorderBoxSchema } from './schema';

export const BorderBox = React.lazy(() => import('./preview'));

registerWidgetConfig(BorderBox, {
  schema: BorderBoxSchema,
});
