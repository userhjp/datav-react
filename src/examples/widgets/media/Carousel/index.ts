import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { CarouselSchema } from './schema';

export const Carousel = React.lazy(() => import('./preview'));

registerWidgetConfig(Carousel, {
  schema: CarouselSchema,
  data: {
    value: [
      { url: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { url: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { url: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { url: '/images/main-img.png', herf: 'https://www.baidu.com' },
    ],
    fields: {
      url: '图片链接地址',
      herf: '超链接地址',
    },
  },
  // events: {
  //   changed: {
  //     description: '当选择日期数据变化时',
  //     fields: {
  //       dateStr: '选择值',
  //     },
  //   },
  // },
});
