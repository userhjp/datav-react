import React, { useEffect, useMemo, useState } from 'react';
import { createDesigner, waitTime } from '@/datav/core';
import { Designer, Preview } from '@/datav/react/containers';
import Axios from 'axios';
import { PageType } from '@/datav/react/interface';
import { resourceData } from './shared/resourceData';
import * as components from './widgets';

const PreviewKey = 'DataV-Preview';
async function getScreen(screenId: string) {
  // await request('', { method: 'POST', params: { screenId } });
  await waitTime(500);
  try {
    const dataStr = localStorage.getItem(PreviewKey);
    if (dataStr || screenId === 'preview') {
      return JSON.parse(dataStr);
    } else {
      const dataStr = await Axios.request({
        url: '/json/demo1.json',
        method: 'get',
      });
      return dataStr;
    }
  } catch (error) {
    localStorage.removeItem(PreviewKey);
  }

  return null;
}

async function saveScreen(data: Partial<PageType>) {
  localStorage.setItem(PreviewKey, JSON.stringify(data));
  await waitTime(500);
  // return request<API.Response>('', {
  //   method: 'POST',
  //   params: {},
  //   data,
  // });
}

export const Main: React.FC = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        onPublish: (data) => {},
        onSnapshot: (data) => {},
        onPreview: (data) => {
          setPreviewData(data);
        },
      }),
    []
  );
  const initData = async () => {
    const data = await getScreen('test');
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
