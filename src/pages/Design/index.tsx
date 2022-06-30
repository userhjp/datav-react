import React, { useEffect, useMemo } from 'react';
import { createDesigner } from '@/datav/core';
import { Designer } from '@/datav/react';
import { IWidgetMenu } from '@/datav';
import { message } from 'antd';
import * as components from '@/examples/widgets';
import { getSnapshot, setPreviewKey, setSnapshot } from '@/utils';
import { useParams } from 'react-router';
import axios from 'axios';

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
        onPublish: (data) => {
          message.info({
            content: '点击发布按钮',
            className: 'dv-message-class',
          });
        },
        onSnapshot: (data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              setSnapshot(id, data);
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

  const initData = async () => {
    engine.toolbar.addLoading();
    let data = await getSnapshot(id);
    if (!data && id !== 'new') {
      const res = await axios.get(`/json/${id}.json`);
      data = res.data;
    }
    if (data) engine.setInitialValue(data);
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
