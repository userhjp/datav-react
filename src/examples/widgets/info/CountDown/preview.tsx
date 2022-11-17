import { Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import FlipClock from './components/FlipClock';
const { Countdown } = Statistic;
import './styles.less';
import { useDatavEvent } from '@/datav/react/hooks';

/** 倒计时 */
const CountDown: React.FC<IWidgetProps> = ({ options, data, events }) => {
  const [deadline, setDeadline] = useState(0);
  const updateVariables = useDatavEvent(events.countdown, null, false);
  // updateVariables({ countdown: timeRef.current });
  const style = {
    ...options,
  };

  const onFinish = () => {
    updateVariables({ countdown: 'finish' });
  };

  useEffect(() => {
    const time = new Date(data?.endTime).getTime();
    if (!options.flop?.show && Date.now() >= time) {
      onFinish();
    } else {
      updateVariables({ countdown: '' });
    }
  }, [options, data]);

  useEffect(() => {
    const time = new Date(data?.endTime).getTime();
    setDeadline(time);
  }, [data]);

  return (
    <div style={style} className="widget-timer">
      {options.flop?.show ? (
        <FlipClock onFinish={onFinish} valStyle={options.flop} value={deadline} />
      ) : (
        <Countdown onFinish={onFinish} valueStyle={style} value={deadline} format={options.format} />
      )}
    </div>
  );
};

export default CountDown;
