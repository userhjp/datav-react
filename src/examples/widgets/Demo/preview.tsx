import { toJS } from '@formily/reactive';
import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import './styles.less';

const Demo: React.FC<IWidgetProps> = (props) => {
  return (
    <div className="demo" style={{ backgroundColor: 'blue' }}>
      <div>测试组件1222</div>
      {JSON.stringify(toJS({ options: props.options, data: props.data }), null, 2)}
    </div>
  );
};

export default Demo;
