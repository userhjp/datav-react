import { Preview } from '@/datav';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './index.less';
const SnapshotKey = 'DataV-Snapshot';

async function getSnapshot() {
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
const Screen: React.FC = () => {
  const [previewData, setPreviewData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const initData = async () => {
    const data = await getSnapshot();
    console.log(searchParams.get('id'));
    // setSearchParams('id=2&aa=3', { replace: true });
    setPreviewData(data);
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="screen-page">
      <Preview data={previewData} />
    </div>
  );
};
export default Screen;
