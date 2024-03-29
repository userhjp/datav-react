import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TitleSchema } from './schema';

export const Title = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.通用标题',
    sort: 1,
    cover: '/menuCover/信息/通用标题.png',
    schema: TitleSchema,
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
