import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TrendSchema } from './schema';

export const Trend = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.业务指标趋势',
    cover: '/menuCover/信息/业务指标趋势.png',
    schema: TrendSchema,
    w: 240,
    h: 80,
    data: {
      fields: {
        value: '数值',
        base: '基础值',
      },
      value: {
        base: 0,
        value: 26,
      },
    },
  }
);
