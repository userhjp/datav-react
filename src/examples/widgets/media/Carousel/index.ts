import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { CarouselSchema } from './schema';

export const Carousel = React.lazy(() => import('./preview'));

registerWidgetConfig(Carousel, {
  taxonPath: '媒体.轮播图',
  cover: '/menuCover/媒体/轮播图.png',
  schema: CarouselSchema,
  data: {
    value: [
      { imgurl: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { imgurl: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { imgurl: '/images/main-img.png', herf: 'https://www.baidu.com' },
      { imgurl: '/images/main-img.png', herf: 'https://www.baidu.com' },
    ],
    fields: {
      imgurl: '图片链接地址',
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
