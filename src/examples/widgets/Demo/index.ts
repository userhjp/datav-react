import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DemoSchema } from './schema';

export const Demo = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.通用图表.测试组件',
    cover: '/menuCover/图表/通用图表/echarts_logo.png',
    schema: DemoSchema,
    data: {
      value: { title: '标题', value: 23 },
      fields: {
        title: '标题',
        value: '值',
      },
    },
    events: {
      changed: {
        description: '当数据变化时',
        fields: {
          title: '标题',
          value: '值',
        },
      },
    },
  }
);
