import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TitleSchema } from './schema';

export const Title = React.lazy(() => import('./preview'));

registerWidgetConfig(Title, {
  schema: TitleSchema,
  w: 300,
  h: 56,
  fields: {
    title: '标题',
    url: '超链接地址',
  },
  data: {
    title: '标题内容',
    url: '',
  },
});