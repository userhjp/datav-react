import React, { useEffect, useMemo, useState } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer } from '@/datav/react';
import { message } from 'antd';
import * as components from './widgets';

const widgetMenu = [
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
  { name: '其他', icon: 'other' },
];

export const Main: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        onPublish: (data) => {
          message.info('点击发布按钮');
        },
        // onHelp: (data) => {
        //   message.info('点击帮助按钮');
        // },
        onSnapshot: (data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              message.success('已保存快照');
              resolve();
            }, 1000);
          });
        },
        onPreview: (data) => {
          setPreviewData(data);
        },
      }),
    []
  );
  const initData = async () => {
    const data = {};
    engine.setInitialValue(data);
  };
  const [previewData, setPreviewData] = useState(null);
  useEffect(() => {
    initData();
  }, []);
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} menu={widgetMenu} components={{ ...components }} />;
      {/* {previewData && (
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999999 }}>
          <a style={{ position: 'absolute', top: 10, right: 10, zIndex: 9999 }} onClick={() => setPreviewData(null)}>
            关闭
          </a>
          <Preview data={previewData} />
        </div>
      )} */}
    </div>
  );
};
