import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { LineBerSchema } from './schema';

export const LineBer = React.lazy(() => import('./preview'));

registerWidgetConfig(LineBer, {
  schema: LineBerSchema,
  data: [
    { x: '2018', y: '上海', v: 70 },
    { x: '2019', y: '上海', v: 55 },
    { x: '2020', y: '上海', v: 50 },
    { x: '2021', y: '上海', v: 30 },
    { x: '2022', y: '上海', v: 50 },

    { x: '2018', y: '深圳', v: 50 },
    { x: '2019', y: '深圳', v: 70 },
    { x: '2020', y: '深圳', v: 60 },
    { x: '2021', y: '深圳', v: 48 },
    { x: '2022', y: '深圳', v: 60 },

    { x: '2018', y: '重庆', v: 30 },
    { x: '2019', y: '重庆', v: 20 },
    { x: '2020', y: '重庆', v: 40 },
    { x: '2021', y: '重庆', v: 68 },
    { x: '2022', y: '重庆', v: 35 },

    { x: '2018', y: '成都', v: 40 },
    { x: '2019', y: '成都', v: 25 },
    { x: '2020', y: '成都', v: 50 },
    { x: '2021', y: '成都', v: 60 },
    { x: '2022', y: '成都', v: 48 },
  ],
  fields: {
    x: '类目',
    y: '系列',
    v: '值',
  },
});
