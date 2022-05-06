import React, { useMemo } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer } from '@/datav/react';
import { message } from 'antd';
import * as components from '@/examples/widgets';
import { setPreviewKey, setSnapshot } from '@/utils';

const widgetMenu = [
  { name: '图表', icon: 'chart' },
  { name: '信息', icon: 'info' },
  { name: '地图', icon: 'map' },
  { name: '媒体', icon: 'media' },
  { name: '控件', icon: 'other' },
  { name: '其他', icon: 'other' },
];

const Design: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        onPublish: (data) => {
          message.info('点击发布按钮');
        },
        onSnapshot: (data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              setSnapshot(data);
              message.info('保存成功');
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

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} menu={widgetMenu} components={{ ...components }} />;
    </div>
  );
};
export default Design;
