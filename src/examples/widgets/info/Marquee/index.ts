import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { MarqueeSchema } from './schema';

export const Marquee = React.lazy(() => import('./preview'));

registerWidgetConfig(Marquee, {
  taxonPath: '信息.跑马灯',
  cover: '/menuCover/信息/跑马灯.png',
  schema: MarqueeSchema,
  w: 300,
  h: 56,
  data: {
    value: {
      value: 'DataV 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。',
    },
    fields: {
      value: '内容',
    },
  },
});
