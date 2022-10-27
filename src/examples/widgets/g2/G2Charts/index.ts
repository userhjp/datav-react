import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { G2ChartsSchema } from './schema';

export const G2Charts = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.通用图表.AntVG2自定义配置',
    sort: -1,
    cover: '/static/menuCover/图表/通用图表/echarts_logo.png',
    schema: G2ChartsSchema,
    data: {
      value: [
        { name: '类型1', value: 23 },
        { name: '类型2', value: 45 },
        { name: '类型3', value: 28 },
        { name: '类型4', value: 12 },
        { name: '类型5', value: 34 },
        { name: '类型6', value: 23 },
        { name: '类型7', value: 14 },
        { name: '类型8', value: 32 },
        { name: '类型9', value: 19 },
        { name: '类型10', value: 23 },
      ],
    },
  }
);
