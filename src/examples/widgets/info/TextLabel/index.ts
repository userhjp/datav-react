import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TextLabelSchema } from './schema';

export const TextLabel = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.文字标签',
    sort: 5,
    cover: '/menuCover/信息/文字标签.png',
    schema: TextLabelSchema,
    w: 320,
    h: 160,
    data: {
      fields: {
        content: '标签值',
        type: '标签类别名',
      },
      value: [
        {
          content: '家有宝宝',
        },
        {
          content: '时尚达人',
          type: 'series1',
        },
        {
          content: '美食专家',
        },
        {
          content: '运动先锋',
          type: 'series1',
        },
        {
          content: 'VIP4',
        },
        {
          content: '美食专家',
          type: 'series1',
        },
      ],
    },
  }
);
