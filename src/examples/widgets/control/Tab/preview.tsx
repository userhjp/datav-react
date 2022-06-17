import React, { useEffect, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import cls from 'classnames';
import './styles.less';

const Tab: React.FC<IWidgetProps> = ({ options, events, data = [] }) => {
  const [activate, setActivate] = useState<any>();
  const time = useRef<NodeJS.Timeout>();
  const currentIndex = useRef<number>(0);
  const { btnSpacing, padding, ...style } = options.style;
  // 事件使用hook方式，参数为 事件配置和数据，注意传入数据key需要和fields的匹配
  useDatavEvent(events.changed, activate);

  useEffect(() => {
    if (!activate && data?.length) {
      setActivate(data[0]);
      currentIndex.current = 0;
    }
  }, [data]);

  const autoSwitch = () => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      if (currentIndex.current >= data.length - 1) {
        currentIndex.current = 0;
      } else {
        currentIndex.current += 1;
      }
      setActivate(data[currentIndex.current]);
      autoSwitch();
    }, options.autoSwitch.waitTime);
  };

  useEffect(() => {
    if (options.autoSwitch?.show) {
      autoSwitch();
    } else {
      clearTimeout(time.current);
    }
    return () => clearTimeout(time.current);
  }, [options]);

  return (
    <div className="widgets-tab" style={{ flexDirection: options.layout === 'vertical' ? 'column' : 'row' }}>
      {(data || []).map((m, i) => (
        <span
          onClick={() => {
            if (currentIndex.current === i) return;
            setActivate(m);
            currentIndex.current = i;
            if (options.autoSwitch?.show) {
              autoSwitch();
            }
          }}
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
