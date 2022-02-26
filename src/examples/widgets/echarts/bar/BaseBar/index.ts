import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { BaseBarSchema } from './schema';

export const BaseBar = React.lazy(() => import('./preview'));

registerWidgetConfig(BaseBar, {
  schema: BaseBarSchema,
  data: {
    value: [
      { x: '2018', y: '上海', v: 90 },
      { x: '2019', y: '上海', v: 75 },
      { x: '2020', y: '上海', v: 70 },
      { x: '2021', y: '上海', v: 50 },
      { x: '2022', y: '上海', v: 70 },

      { x: '2018', y: '深圳', v: 70 },
      { x: '2019', y: '深圳', v: 90 },
      { x: '2020', y: '深圳', v: 80 },
      { x: '2021', y: '深圳', v: 68 },
      { x: '2022', y: '深圳', v: 80 },

      { x: '2018', y: '重庆', v: 50 },
      { x: '2019', y: '重庆', v: 40 },
      { x: '2020', y: '重庆', v: 60 },
      { x: '2021', y: '重庆', v: 88 },
      { x: '2022', y: '重庆', v: 55 },

      { x: '2018', y: '成都', v: 60 },
      { x: '2019', y: '成都', v: 45 },
      { x: '2020', y: '成都', v: 70 },
      { x: '2021', y: '成都', v: 80 },
      { x: '2022', y: '成都', v: 58 },
    ],
    fields: {
      x: '类目',
      y: '系列',
      v: '值',
    },
  },
});
