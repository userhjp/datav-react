import { Preview } from '@/datav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as components from '@/examples/widgets';
import { getPreviewKey } from '@/utils';
import './index.less';
import { message } from 'antd';
import { getProjectDetail } from '@/services/datavApi';

// GlobalRegistry.registerDesignerWidget({ ...components });

const Screen: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();

  const initData = async () => {
    let data = getPreviewKey(id);
    if (!data) {
      const res = await getProjectDetail(id);
      if (res.code === 0) {
        data = res.data?.config || null;
      } else {
        message.error(res.message);
      }
    }
    setData(data);
    setloading(false);
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="screen-page">
      <Preview data={data} components={{ ...components }} />
      {!data && !loading && (
        <div style={{ position: 'absolute', top: 30, fontSize: 20, color: '#fff', textAlign: 'center', width: '100%' }}>大屏不存在</div>
      )}
    </div>
  );
};
export default Screen;
