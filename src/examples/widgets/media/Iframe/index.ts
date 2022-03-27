import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { IframeSchema } from './schema';

export const Iframe = React.lazy(() => import('./preview'));

registerWidgetConfig(Iframe, {
  schema: IframeSchema,
});
