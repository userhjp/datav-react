import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import './styles.less';

const Demo: React.FC<IWidgetProps> = (props) => {
  // 事件使用方法
  useDatavEvent(props.events.changed, props.data);

  return (
    <div className="demo" style={{ backgroundColor: 'blue' }}>
      <div>测试组件1222</div>
      {JSON.stringify({ options: props.options, data: props.data }, null, 2)}
    </div>
  );
};

export default Demo;
