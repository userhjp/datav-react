import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseFunnelSchema } from './schema';

export const BaseFunnel = React.lazy(() => import('./preview'));

registerWidgetConfig(BaseFunnel, {
  schema: BaseFunnelSchema,
  w: 340,
  h: 280,
  data: {
    value: [
      { name: '上海', value: '100' },
      { name: '深圳', value: '80' },
      { name: '北京', value: '60' },
      { name: '重庆', value: '40' },
      { name: '成都', value: '20' },
    ],
    fields: {
      name: '名称',
      value: '值',
    },
  },
});
