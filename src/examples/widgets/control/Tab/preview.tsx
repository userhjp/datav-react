import React, { useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import cls from 'classnames';
import './styles.less';

const Tab: React.FC<IWidgetProps> = ({ options, events, data }) => {
  const [activate, setActivate] = useState('1');

  const list = [
    {
      label: '按钮1',
      value: '1',
    },
    {
      label: '按钮2',
      value: '2',
    },
    {
      label: '按钮3',
      value: '3',
    },
  ];
  // 事件使用hook方式，参数为 事件配置和数据，注意传入数据key需要和fields的匹配
  useDatavEvent(events.changed, data);

  return (
    <div className="widgets-tab">
      {list.map((m, i) => (
        <span
          onClick={() => setActivate(m.value)}
          style={{ ...options.style, ...(m.value === activate ? options.activeStyle : {}) }}
          key={i}
          className={cls({
            'widgets-tab-activate': m.value === activate,
          })}
        >
          {m.label}
        </span>
      ))}
    </div>
  );
};

export default Tab;
