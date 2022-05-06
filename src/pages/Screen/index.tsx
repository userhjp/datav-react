import { Preview } from '@/datav';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as components from '@/examples/widgets';
import { getPreviewKey } from '@/utils';
import './index.less';

// GlobalRegistry.registerDesignerWidget({ ...components });

const Screen: React.FC = () => {
  const [previewData, setPreviewData] = useState(null);
  const { id } = useParams();

  const initData = async () => {
    if (id === 'preview') {
      const data = getPreviewKey();
      setPreviewData(data);
    } else {
      const data = getPreviewKey();
      setPreviewData(data);
    }
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="screen-page">
      <Preview data={previewData} components={{ ...components }} />
    </div>
  );
};
export default Screen;
