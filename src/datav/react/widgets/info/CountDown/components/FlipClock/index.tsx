import { formatDate } from '@/datav/shared';
import { formatSecondTime } from '@/datav/shared';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Flipper, { FlipperRef } from '../Flipper';
import './index.less';

type FlipperProps = {
  value: number;
  valStyle: any;
};

const FlipClock: React.FC<FlipperProps> = (props) => {
  const flipObjs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const timer = useRef<NodeJS.Timeout>();
  const valueState = useRef(0);

  useLayoutEffect(() => {
    valueState.current = props.value;
    if (valueState.current) {
      init(valueState.current);
      run();
    }
    return () => clearInterval(timer.current);
  }, [props.value]);

  // 初始化数字
  const init = (value: number) => {
    const nowTimeStr = joinStr(value);
    for (let i = 0; i < flipObjs.length; i++) {
      if (flipObjs[i].current) {
        (flipObjs[i].current as FlipperRef).setFront(+nowTimeStr[i]);
      }
    }
  };

  const update = () => {
    // const nowTimeStr = formatDate(valueState.current, 'HHmmss');
    // const nextTimeStr = formatDate(valueState.current - 1000, 'HHmmss');
    const nowTimeStr = joinStr(valueState.current - 1000);
    const nextTimeStr = joinStr(valueState.current);
    for (let i = 0; i < flipObjs.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue;
      }
      (flipObjs[i].current as FlipperRef).flip('down', +nextTimeStr[i], +nowTimeStr[i]);
    }
  };

  const joinStr = (dateTime: number) => {
    const dateObj = formatSecondTime(dateTime);
    return `${revamp(dateObj.hourTime)}${revamp(dateObj.minuteTime)}${revamp(dateObj.secondTime)}`;
  };

  const revamp = (num: number) => {
    const val = num ? `${num}` : '00';
    return val.length == 1 ? ('00' + val).substr(val.length) : val;
  };

  // 开始计时
  const run = () => {
    clearInterval(timer.current);
    timer.current = setInterval(update, 1000);
  };

  return (
    <div className="FlipClock">
      <Flipper ref={flipObjs[0]} styleVal={props.valStyle} />
      <Flipper ref={flipObjs[1]} styleVal={props.valStyle} />
      <em>:</em>
      <Flipper ref={flipObjs[2]} styleVal={props.valStyle} />
      <Flipper ref={flipObjs[3]} styleVal={props.valStyle} />
      <em>:</em>
      <Flipper ref={flipObjs[4]} styleVal={props.valStyle} />
      <Flipper ref={flipObjs[5]} styleVal={props.valStyle} />
    </div>
  );
};

export default FlipClock;