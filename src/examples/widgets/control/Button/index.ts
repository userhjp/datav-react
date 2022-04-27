import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { ButtonSchema } from './schema';

export const Button = React.lazy(() => import('./preview'));

registerWidgetConfig(Button, {
  taxonPath: '控件.按钮',
  cover: '/menuCover/控件/按钮.png',
  schema: ButtonSchema,
  h: 44,
  w: 300,
  data: {
    value: [
      {
        label: '按钮1',
        value: '1',
      },
      {
        label: '按钮2',
        value: '2',
      },
      {
        label: '按钮3',
        value: '3',
      },
    ],
    fields: {
      label: '标题',
      value: '值',
    },
  },
  events: {
    changed: {
      description: '当Button切换时',
      fields: {
        value: '选中值',
      },
    },
  },
});
