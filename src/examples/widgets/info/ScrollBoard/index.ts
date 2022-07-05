import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { ScrollBoardSchema } from './schema';

export const ScrollBoard = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.轮播列表',
    cover: '/menuCover/信息/轮播列表.png',
    sort: 3,
    schema: ScrollBoardSchema,
    w: 320,
    h: 200,
    data: {
      value: {
        list: [
          { key1: '行1列1', key2: '行1列2', key3: '行1列3', key4: '行1列4' },
          { key1: '行2列1', key2: '行2列2', key3: '行2列3', key4: '行2列4' },
          { key1: '行3列1', key2: '行3列2', key3: '行3列3', key4: '行3列4' },
          { key1: '行4列1', key2: '行4列2', key3: '行4列3', key4: '行4列4' },
          { key1: '行5列1', key2: '行5列2', key3: '行5列3', key4: '行5列4' },
          { key1: '行6列1', key2: '行6列2', key3: '行6列3', key4: '行6列4' },
        ],
      },
      fields: {
        list: '数据列表',
      },
    },
  }
);
