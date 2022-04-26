import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { DatePickerSchema } from './schema';

export const DatePicker = React.lazy(() => import('./preview'));

registerWidgetConfig(DatePicker, {
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
});
