import { useDebounceEffect, useDebounceFn, useSize } from 'ahooks';
import React, { useMemo, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import './styles.less';

/** 跑马灯 */
const Marquee: React.FC<IWidgetProps> = ({ options, data }) => {
  const marqueeTextRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const size = useSize(marqueeRef);
  const timeId1 = useRef<NodeJS.Timeout>();
  const timeId2 = useRef<NodeJS.Timeout>();
  const width = useRef(0);
  const { ifSpeed, speed, duration, loop, timeout, backgroundStyle } = options;
  const { show, ...bgStyle } = backgroundStyle;

  const [textStyle, setTextStyle] = useState({
    transform: 'translateX(0)',
    transition: 'none 0s ease 0s',
  });

  const doMarquee = () => {
    if (marqueeTextRef.current) {
      width.current = marqueeTextRef.current.offsetWidth / 2;
      if (width.current > size?.width) {
        let t = 0;
        if (ifSpeed) {
          t = (speed / 100) * width.current;
        } else {
          t = duration;
        }
        setTextStyle({
          transform: `translateX(-${width.current}px)`,
          transition: `transform ${t}ms linear 0s`,
        });
        timeId1.current = setTimeout(() => {
          setTextStyle({
            transform: 'translateX(0)',
            transition: 'none 0s ease 0s',
          });
          if (loop) {
            if (timeout > 0) {
              timeId2.current = setTimeout(doMarquee, timeout);
            } else {
              doMarquee();
            }
          }
        }, t);
      } else {
        width.current = marqueeTextRef.current.offsetWidth;
        setTextStyle({
          transform: 'translateX(0)',
          transition: 'none 0s ease 0s',
        });
      }
    }
  };

  const { run } = useDebounceFn(doMarquee, {
    wait: 500,
  });

  useDebounceEffect(
    () => {
      clearTimeout(timeId1.current);
      clearTimeout(timeId2.current);
      width.current = marqueeTextRef.current.offsetWidth;
      setTextStyle({
        transform: 'translateX(0)',
        transition: 'none 0s ease 0s',
      });
      run();
      return () => {
        clearTimeout(timeId1.current);
        clearTimeout(timeId2.current);
      };
    },
    [size, ifSpeed, duration, timeout, loop, speed],
    { wait: 500 }
  );

  const style = useMemo(() => {
    return {
      ...options,
    };
  }, [options]);

  const renderText = () => {
    return (
      <div
        style={{
          display: 'inline-block',
          minWidth: `${size?.width}px`,
        }}
      >
        {data?.value}
        <i
          style={{
            display: 'inline-block',
            width: '80px',
          }}
        />
      </div>
    );
  };

  return (
    <div className="widget-marquee-warp" style={show ? bgStyle : {}}>
      <div ref={marqueeRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap', ...style }} className="widget-marquee-comp">
        <div style={{ display: 'inline-block', ...textStyle }} ref={marqueeTextRef}>
          <React.Fragment key="1">{renderText()}</React.Fragment>
          <React.Fragment key="2">{renderText()}</React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
