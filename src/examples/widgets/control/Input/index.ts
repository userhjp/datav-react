import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { InputSchema } from './schema';

export const Input = React.lazy(() => import('./preview'));

registerWidgetConfig(Input, {
  schema: InputSchema,
  h: 44,
  w: 300,
  events: {
    changed: {
      description: '当点击按钮时',
      fields: {
        value: '输入值',
      },
    },
  },
});
