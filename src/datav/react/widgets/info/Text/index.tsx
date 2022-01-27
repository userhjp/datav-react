import { useDebounceEffect, useDebounceFn, useSize } from 'ahooks';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ComType } from '@/datav/interface';
import './index.less';

/** 多行文本 */
const Text: React.FC<ComType> = ({ options, data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);
  const timeId = useRef<NodeJS.Timeout>();
  const [bigContentStyle, setBigContentStyle] = useState({
    transform: 'translateY(0)',
    transition: 'none 0s ease 0s',
  });

  const doScollText = () => {
    if (containerRef.current && size) {
      const textHeight = textRef.current.offsetHeight;
      if (textHeight > size.height) {
        setBigContentStyle({
          transform: `translateY(-${textHeight}px)`,
          transition: `transform ${options.scroll.duration}ms linear 0s`,
        });
        timeId.current = setTimeout(() => {
          setBigContentStyle({
            transform: 'translateY(0)',
            transition: 'none 0s ease 0s',
          });
          if (options.scroll.overflowScroll) {
            doScollText();
          }
        }, options.scroll.duration);
      } else {
        setBigContentStyle({
          transform: 'translateY(0)',
          transition: 'none 0s ease 0s',
        });
      }
    }
  };

  const { run } = useDebounceFn(doScollText, {
    wait: 500,
  });

  useDebounceEffect(
    () => {
      clearTimeout(timeId.current);
      setBigContentStyle({
        transform: 'translateX(0)',
        transition: 'none 0s ease 0s',
      });
      run();
      return () => clearTimeout(timeId.current);
    },
    [size, options.scroll.overflowScroll, options.scroll.duration],
    { wait: 500 }
  );

  const style = useMemo(() => {
    return {
      ...options,
      lineHeight: options.lineHeight + 'px',
    };
  }, [options]);

  const bgStyle = useMemo(() => options?.backgroundStyle || {}, [options]);

  const linkUrl = options?.link?.href;
  const goPath = () => {
    if (options?.link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  return (
    <div className="widget-Text-warp" ref={containerRef} style={bgStyle}>
      <div
        style={{ ...style, ...bigContentStyle }}
        className={`widget-Text-comp ${linkUrl ? 'cursor_p' : ''}`}
        onClick={linkUrl ? goPath : null}
      >
        <div ref={textRef}>{data?.content}</div>
        {options.scroll.overflowScroll && textRef.current?.offsetHeight > size?.height && <div>{data?.content}</div>}
      </div>
    </div>
  );
};

export default Text;
