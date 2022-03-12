import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BgBoxSchema } from './schema';

export const BgBox = React.lazy(() => import('./preview'));

registerWidgetConfig(BgBox, {
  schema: BgBoxSchema,
});
