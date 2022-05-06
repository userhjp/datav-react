import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DatePickerSchema } from './schema';

export const DatePicker = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '控件.日期选择框',
    cover: '/menuCover/控件/日期选择框.png',
    schema: DatePickerSchema,
    h: 44,
    w: 300,
    events: {
      changed: {
        description: '当选择日期数据变化时',
        fields: {
          dateStr: '选择值',
        },
      },
    },
  }
);
