import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TrendSchema } from './schema';

export const Trend = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.业务指标趋势',
    sort: 1,
    cover: '/menuCover/信息/业务指标趋势.png',
    schema: TrendSchema,
    w: 300,
    h: 56,
    data: {
      fields: {
        title: '标题',
        url: '超链接地址',
      },
      value: {
        title: '',
        url: '',
      },
    },
  }
);
