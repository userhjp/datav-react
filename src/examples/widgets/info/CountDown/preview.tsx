import { Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { IWidgetNode } from '@/datav/react/interface';
import FlipClock from './components/FlipClock';
const { Countdown } = Statistic;
import './styles.less';

/** 倒计时 */
const CountDown: React.FC<IWidgetNode> = ({ options, data }) => {
  const [deadline, setDeadline] = useState(0);
  const style = {
    ...options,
  };

  useEffect(() => {
    setDeadline(Date.now() + data?.value || 0);
  }, [data]);

  return (
    <div style={style} className="widget-timer">
      {options.flop?.show ? (
        <FlipClock valStyle={options.flop} value={deadline} />
      ) : (
        <Countdown valueStyle={style} value={deadline} format={options.format} />
      )}
    </div>
  );
};

export default CountDown;