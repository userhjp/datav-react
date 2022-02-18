import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { ComType } from '@/datav/react/interface';
import './index.less';

const BaseBar: React.FC<ComType> = ({ options }) => {
  const videoRef = useRef<HTMLVideoElement>();
  const style: React.CSSProperties = useMemo(() => {
    return {};
  }, [options]);

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef.current]);

  return (
    <div style={style} className="widget-single-img">
      <video
        ref={videoRef}
        style={{
          objectFit: 'fill',
        }}
        autoPlay
        controls={options.controls}
        muted={options.muted}
        height="100%"
        width="100%"
        src={options.src}
      />
    </div>
  );
};

export default BaseBar;
