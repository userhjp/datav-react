import React, { useEffect, useMemo, useState } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer, IDvMaterial } from '@/datav/react';
import { IWidgetMenu } from '@/datav';
import { message } from 'antd';
import * as components from '@/examples/widgets';
import { getSnapshot, setPreviewKey, setSnapshot } from '@/utils';

const widgetMenu: IWidgetMenu[] = [
  {
    name: '图表',
    icon: 'chart',
    children: [
      { name: '通用图表', children: [] },
      { name: '柱状图', children: [] },
      { name: '条形图', children: [] },
      { name: '折线图', children: [] },
      { name: '饼图', children: [] },
      { name: '雷达图', children: [] },
      { name: '散点图', children: [] },
      { name: '其他', children: [] },
    ],
  },
  { name: '信息', icon: 'info' },
  { name: '媒体', icon: 'media' },
  { name: '控件', icon: 'other' },
  { name: '地图', icon: 'map' },
  { name: '素材', icon: 'material' },
  { name: '其他', icon: 'other' },
];

const material: IDvMaterial[] = [
  {
    type: 'bgImg',
    name: '背景图11',
    url: 'https://img.alicdn.com/imgextra/i3/O1CN01NY5TI92AEMwAvZUpo_!!6000000008171-0-tps-352-198.jpg',
  },
  {
    type: 'bgImg',
    name: '背景图10',
    url: 'https://img.alicdn.com/imgextra/i2/O1CN014FT9001TMaZGIeWPS_!!6000000002368-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图9',
    url: 'https://img.alicdn.com/imgextra/i1/O1CN014HIRIb1ajfpTeRSAa_!!6000000003366-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图8',
    url: 'https://img.alicdn.com/imgextra/i4/O1CN016PsaHh25rESI9IXyj_!!6000000007579-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图7',
    url: 'https://img.alicdn.com/imgextra/i4/O1CN01VYtHoE1cqChvdsqzD_!!6000000003651-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图6',
    url: 'https://img.alicdn.com/imgextra/i3/O1CN01NNOUbP26vBU7K8xWc_!!6000000007723-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图5',
    url: 'https://img.alicdn.com/imgextra/i2/O1CN01UQSeaI1s1r1GQQQlv_!!6000000005707-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图4',
    url: 'https://img.alicdn.com/imgextra/i4/O1CN01ePo6mI1kbYyQC87bi_!!6000000004702-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图3',
    url: 'https://img.alicdn.com/imgextra/i2/O1CN01HfbwBY1GcXLF1SjO0_!!6000000000643-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图2',
    url: 'https://img.alicdn.com/imgextra/i3/O1CN01vh7nyH1KE2caabzPr_!!6000000001131-2-tps-352-198.png',
  },
  {
    type: 'bgImg',
    name: '背景图1',
    url: 'https://img.alicdn.com/imgextra/i1/O1CN01LLH0XG23oMk6dlE4X_!!6000000007302-2-tps-352-198.png',
  },
  {
    type: 'decorate',
    name: '背景框',
    url: 'https://img.alicdn.com/imgextra/i1/O1CN01KaIKn21LZOibDX62k_!!6000000001313-2-tps-560-60.png',
    config: {
      width: '11px 14px',
      outset: '0',
      slice: '22 28 fill',
      repeat: 'repeat',
    },
  },
];

const Design: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        onPublish: (data) => {
          message.info({
            content: '点击发布按钮',
            className: 'dv-message-class',
          });
        },
        onSnapshot: (data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              setSnapshot(data);
              message.success({
                content: '保存成功',
                className: 'dv-message-class',
              });
              resolve();
            }, 1000);
          });
        },
        onPreview: (data) => {
          setPreviewKey(data);
          window.open(`/screen/preview`);
        },
      }),
    []
  );

  useEffect(() => {
    getSnapshot().then((val) => {
      engine.setInitialValue(val);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} menu={widgetMenu} components={{ ...components }} material={material} />;
    </div>
  );
};
export default Design;
