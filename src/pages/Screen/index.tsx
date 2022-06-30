import { Preview } from '@/datav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as components from '@/examples/widgets';
import { getPreviewKey } from '@/utils';
import './index.less';
import axios from 'axios';

// GlobalRegistry.registerDesignerWidget({ ...components });

const Screen: React.FC = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const initData = async () => {
    if (id === 'preview') {
      const data = getPreviewKey();
      setData(data);
    } else {
      const res = await axios.get(`/json/${id}.json`);
      if (res.data) setData(res.data);
    }
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="screen-page">
      <Preview data={data} components={{ ...components }} />
      {!data && (
        <div style={{ position: 'absolute', top: 30, fontSize: 20, color: '#fff', textAlign: 'center', width: '100%' }}>大屏不存在</div>
      )}
    </div>
  );
};
export default Screen;
