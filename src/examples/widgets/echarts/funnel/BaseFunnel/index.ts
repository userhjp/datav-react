import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseFunnelSchema } from './schema';

export const BaseFunnel = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '图表.其他.漏斗图',
    cover: '/menuCover/图表/其他/漏斗图.png',
    schema: BaseFunnelSchema,
    w: 410,
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
  }
);
