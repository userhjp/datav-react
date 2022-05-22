import React, { useEffect, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import cls from 'classnames';
import './styles.less';

const Tab: React.FC<IWidgetProps> = ({ options, events, data = [] }) => {
  const [activate, setActivate] = useState<any>();

  const { btnSpacing, padding, ...style } = options.style;
  // 事件使用hook方式，参数为 事件配置和数据，注意传入数据key需要和fields的匹配
  useDatavEvent(events.changed, activate);

  useEffect(() => {
    if (!activate && data?.length) {
      setActivate(data[0]);
    }
  }, [data]);

  return (
    <div className="widgets-tab" style={{ flexDirection: options.layout === 'vertical' ? 'column' : 'row' }}>
      {(data || []).map((m, i) => (
        <span
          onClick={() => setActivate(m)}
          style={{
            padding: `${padding?.vertical || 2}px ${padding?.horizontal || 10}px`,
            ...style,
            ...options.borderStyle,
            ...(m.value === activate?.value ? options.activeStyle : {}),
          }}
          key={i}
          className={cls({
            'widgets-tab-activate': m.value === activate?.value,
          })}
        >
          {m.label}
        </span>
      ))}
    </div>
  );
};

export default Tab;
