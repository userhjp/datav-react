import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { TextSchema } from './schema';

export const Text = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '信息.多行文本',
    cover: '/menuCover/信息/多行文本.png',
    sort: 2,
    schema: TextSchema,
    w: 300,
    h: 200,
    data: {
      fields: {
        content: '段落内容',
        url: '超链接地址',
      },
      value: {
        content:
          'DataV 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。通过拖拽即可实现灵活的可视化布局，在模板的基础上任何人都能够发挥创意，实现您自己的可视化应用。支持阿里云分析数据库、关系型数据库、Restful API、CSV、静态JSON等多种数据来源，且能够动态轮询。能够实现多个数据源汇聚于一个可视化界面中',
        url: '',
      },
    },
  }
);
