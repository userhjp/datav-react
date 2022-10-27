import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { NumberFlopSchema } from './schema';

export const NumberFlop = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.数字翻牌器',
    cover: '/static/menuCover/信息/数字翻牌器.png',
    schema: NumberFlopSchema,
    w: 350,
    h: 70,
    data: {
      value: {
        title: '',
        value: 123457,
      },
      fields: {
        title: '标题',
        value: '值',
      },
    },
  }
);
