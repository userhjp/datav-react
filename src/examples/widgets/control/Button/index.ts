import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { ButtonSchema } from './schema';

export const Button = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '控件.按钮',
    cover: '/menuCover/控件/按钮.png',
    schema: ButtonSchema,
    h: 44,
    w: 200,
    data: {
      value: {
        value: '1',
      },
      fields: {
        value: '值',
      },
    },
    events: {
      changed: {
        description: '点击按钮时',
        fields: {
          value: '值',
        },
      },
    },
  }
);
