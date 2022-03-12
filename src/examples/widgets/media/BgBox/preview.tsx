import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';

/** 自定义背景快 */
const BgBox: React.FC<IWidgetProps> = ({ options }) => {
  const style: React.CSSProperties = useMemo(() => {
    return {
      // background: 'none',
      // borderRadius: 0,
      // borderStyle: 'solid',
      // borderWidth: 1,
      width: '100%',
      height: '100%',
      // borderImage: `url(${img.src}) ${img.border.slice} / ${img.border.width} / ${img.border.outset} ${img.border.repeat}`,
      ...(options || {}),
      filter: `blur(${options.filter}px)`,
    };
  }, [options]);

  return <div style={style} />;
};

export default BgBox;
