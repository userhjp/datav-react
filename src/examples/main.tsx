import React, { useEffect, useMemo, useState } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer, Preview } from '@/datav/react/containers';
import { resourceData } from './shared/resourceData';
import * as components from './widgets';
import { message } from 'antd';
import { waitTime } from '@/datav/shared';

const SnapshotKey = 'DataV-Snapshot';

async function getSnapshot() {
  await waitTime(500);
  try {
    return JSON.parse(localStorage.getItem(SnapshotKey));
  } catch (error) {
    localStorage.removeItem(SnapshotKey);
  }

  return null;
}

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
              localStorage.setItem(SnapshotKey, JSON.stringify(data));
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
    const data = await getSnapshot();
    engine.setInitialValue(data);
  };
  const [previewData, setPreviewData] = useState(null);
  useEffect(() => {
    initData();
  }, []);
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} resourceData={resourceData} components={{ ...components }} />;
      {previewData && (
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999999 }}>
          <a style={{ position: 'absolute', top: 10, right: 10, zIndex: 9999 }} onClick={() => setPreviewData(null)}>
            关闭
          </a>
          <Preview data={previewData} />
        </div>
      )}
    </div>
  );
};
