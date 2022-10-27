import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { QrCodeSchema } from './schema';

export const QrCode = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.二维码',
    cover: '/static/menuCover/信息/二维码.png',
    schema: QrCodeSchema,
    w: 200,
    h: 200,
    data: {
      fields: {
        content: '二维码内容',
      },
      value: {
        content: 'https://www.baidu.com',
      },
    },
  }
);
