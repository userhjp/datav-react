import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { QrCodeSchema } from './schema';

export const QrCode = React.lazy(() => import('./preview'));

registerWidgetConfig(QrCode, {
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
});
