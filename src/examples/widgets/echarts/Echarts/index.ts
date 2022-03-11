import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { EChartsSchema } from './schema';

export const ECharts = React.lazy(() => import('./preview'));

registerWidgetConfig(ECharts, {
  schema: EChartsSchema,
  data: {} as any,
});
