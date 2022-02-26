import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DemoSchema } from './schema';

export const Demo = React.lazy(() => import('./preview'));

registerWidgetConfig(Demo, {
  schema: DemoSchema,
  data: {
    value: [
      { x: '上海', y: 23 },
      { x: '深圳', y: 13 },
      { x: '合肥', y: 2 },
      { x: '成都', y: 9 },
      { x: '安徽', y: 5 },
      { x: '北京', y: 10 },
      { x: '杭州', y: 14 },
      { x: '长沙', y: 24 },
    ],
    fields: {
      x: 'x轴',
      y: 'y轴',
    },
  },
});
