import React, { useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import cls from 'classnames';
import './styles.less';

const Tab: React.FC<IWidgetProps> = (props) => {
  const [activate, setActivate] = useState('1');

  const list = [
    {
      label: '按钮1',
      value: '1',
    },
    {
      label: '按钮1',
      value: '2',
    },
    {
      label: '按钮1',
      value: '2',
    },
  ];
  // 事件使用hook方式，参数为 事件配置和数据，注意传入数据key需要和fields的匹配
  useDatavEvent(props.events.changed, props.data);

  return (
    <div className="widgets-tab">
      <ul>
        {list.map((m) => (
          <li
            key={m.value}
            className={cls({
              'widgets-tab-activate': m.value === activate,
            })}
          >
            按钮1
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
