import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import './styles.less';

const Demo: React.FC<IWidgetProps> = (props) => {
  // 事件使用hook方式，参数为 事件配置和数据，注意传入数据key需要和fields的匹配
  useDatavEvent(props.events.changed, props.data);

  return (
    <div className="demo" style={{ backgroundColor: 'blue', fontSize: 40 }}>
      <div>测试组件1222</div>
      {JSON.stringify({ options: props.options, data: { ...props.data } }, null, 2)}
    </div>
  );
};

export default Demo;
