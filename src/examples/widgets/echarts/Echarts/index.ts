import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { EChartsSchema } from './schema';

export const ECharts = React.lazy(() => import('./preview'));

registerWidgetConfig(ECharts, {
  schema: EChartsSchema,
  data: {
    value: {
      dimensions: ['x', '上海', '深圳', '重庆', '成都'],
      source: [
        { x: '2018', 上海: 90, 深圳: 70, 重庆: 50, 成都: 60 },
        { x: '2019', 上海: 75, 深圳: 90, 重庆: 40, 成都: 45 },
        { x: '2020', 上海: 70, 深圳: 80, 重庆: 60, 成都: 70 },
        { x: '2021', 上海: 50, 深圳: 68, 重庆: 88, 成都: 80 },
        { x: '2022', 上海: 70, 深圳: 80, 重庆: 55, 成都: 58 },
      ],
    },
  } as any,
});
