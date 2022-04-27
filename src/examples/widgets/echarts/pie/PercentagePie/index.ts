import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { PercentagePieSchema } from './schema';

export const PercentagePie = React.lazy(() => import('./preview'));

registerWidgetConfig(PercentagePie, {
  taxonPath: '图表.饼图.单值百分比饼图',
  cover: '/menuCover/图表/饼图/单值百分比饼图.png',
  schema: PercentagePieSchema,
  data: {
    value: { text: '已完成', value: 75 },
    fields: {
      text: '文本',
      value: '值',
    },
  },
});
