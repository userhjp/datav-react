import React, { useEffect, useMemo } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer } from '@/datav/react';
import { IWidgetMenu } from '@/datav';
import { message } from 'antd';
import * as components from '@/examples/widgets';
import { setPreviewKey } from '@/utils';
import { useParams } from 'react-router';
import { addSnapshot, getProjectDetail, getSnapshotList, saveConfig } from './../../services/datavApi';

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

const Design: React.FC = () => {
  const { id } = useParams();
  const engine = useMemo(
    () =>
      createDesigner({
        onPublish: async (data) => {
          const res = await saveConfig(id, data);
          if (res.code === 0) {
            message.success({
              content: '发布成功',
              className: 'dv-message-class',
            });
          } else {
            message.error(res.message);
          }
        },
        onSnapshot: async (data) => {
          const res = await addSnapshot(id, data);
          if (res.code === 0) {
            message.success({
              content: '保存成功',
              className: 'dv-message-class',
            });
          } else {
            message.error(res.message);
          }
        },
        onPreview: (data) => {
          setPreviewKey(id, data);
          window.open(`/screen/${id}`);
        },
      }),
    []
  );

  const initData = async () => {
    engine.toolbar.addLoading();
    const snapshot = await getSnapshotList(id);
    engine.snapshot.setInitialValue(snapshot.data || []);
    // let data = await getSnapshot(id);

    const res = await getProjectDetail(id);
    if (res.code === 0) {
      const data = res.data || null;
      if (data) {
        engine.setInitialValue(data.config);
        engine.screen.title = data.title;
      }
    } else {
      message.error(res.message);
    }
    engine.toolbar.removeLoading();
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Designer engine={engine} menu={widgetMenu} components={{ ...components }} material={[]} />;
    </div>
  );
};
export default Design;
