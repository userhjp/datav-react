import { toJS } from '@formily/reactive';
import React from 'react';
import { ComType } from '@/datav/interface';
import './index.less';

const chartDemo: React.FC<ComType> = (props) => {
  return (
    <div className="demo" style={{ backgroundColor: 'blue' }}>
      <div>测试组件1222</div>
      {JSON.stringify(toJS({ options: props.options, data: props.data }), null, 2)}
    </div>
  );
};

export default chartDemo;
