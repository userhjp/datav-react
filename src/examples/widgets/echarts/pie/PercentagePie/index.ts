import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { PercentagePieSchema } from './schema';

export const PercentagePie = React.lazy(() => import('./preview'));

registerWidgetConfig(PercentagePie, {
  schema: PercentagePieSchema,
  data: {
    value: { text: '已完成', value: 75 },
    fields: {
      text: '文本',
      value: '值',
    },
  },
});
