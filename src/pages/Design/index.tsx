import React, { useEffect, useMemo, useState } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer } from '@/datav/react';
import { message } from 'antd';
import { waitTime } from '@/datav/shared';
import axios from 'axios';
import * as components from '@/examples/widgets';
import { GlobalRegistry } from '@/datav/core/registry';

const widgetMenu = [
  { name: '图表', icon: 'chart' },
  { name: '信息', icon: 'info' },
  { name: '地图', icon: 'map' },
  { name: '媒体', icon: 'media' },
  { name: '控件', icon: 'other' },
  { name: '其他', icon: 'other' },
];

const SnapshotKey = 'DataV-Snapshot';

async function getSnapshot() {
  await waitTime(500);
  try {
    const json = JSON.parse(localStorage.getItem(SnapshotKey));
    if (json) {
      return json;
    } else {
      const json2 = await axios.get('/json/demo.json');
      return json2.data;
    }
  } catch (error) {
    localStorage.removeItem(SnapshotKey);
  }
  return null;
}
GlobalRegistry.registerDesignerWidget({ ...components });
const Design: React.FC = () => {
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
              localStorage.setItem(SnapshotKey, JSON.stringify(data));
              message.success('已保存快照');
              resolve();
            }, 1000);
          });
        },
        onPreview: (data) => {
          localStorage.setItem(SnapshotKey, JSON.stringify(data));
          window.open(`/screen`);
        },
      }),
    []
  );
  const initData = async () => {
    const data = await getSnapshot();
    engine.setInitialValue(data);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} widgetMenu={widgetMenu} components={{ ...components }} />;
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
export default Design;
