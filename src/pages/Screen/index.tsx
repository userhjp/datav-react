import { Preview } from '@/datav';
import React, { useEffect, useMemo } from 'react';
import './index.less';

const Screen: React.FC = () => {
  // const designer = useMemo(() => createDesigner(), []);
  // const initData = async () => {
  //   designer.toolbar.addLoading();
  //   const data = await getScreen('1');
  //   designer.setValues(data);
  //   designer.toolbar.removeLoading();
  // };

  useEffect(() => {
    // initData();
  }, []);
  return (
    <div className="screen-page">
      <Preview data={{}} />
    </div>
  );
};
export default Screen;
