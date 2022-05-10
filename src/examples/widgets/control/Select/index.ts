import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { SelectSchema } from './schema';

export const Select = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '控件.下拉选择器',
    cover: '/menuCover/控件/下拉选择器.png',
    schema: SelectSchema,
    h: 44,
    w: 280,
    data: {
      value: [
        {
          label: '选择项1',
          value: '1',
        },
        {
          label: '选择项2',
          value: '2',
        },
        {
          label: '选择项3',
          value: '3',
        },
      ],
      fields: {
        label: '名称',
        value: '值',
      },
    },
    events: {
      changed: {
        description: '当选中项变化时',
        fields: {
          value: '选择值',
        },
      },
    },
  }
);
