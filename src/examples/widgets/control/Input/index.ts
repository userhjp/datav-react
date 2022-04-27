import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { InputSchema } from './schema';

export const Input = React.lazy(() => import('./preview'));

registerWidgetConfig(Input, {
  taxonPath: '控件.输入框',
  cover: '/menuCover/控件/输入框.png',
  schema: InputSchema,
  h: 44,
  w: 300,
  events: {
    changed: {
      description: '当点击按钮或数据变化时',
      fields: {
        value: '输入值',
      },
    },
  },
});
