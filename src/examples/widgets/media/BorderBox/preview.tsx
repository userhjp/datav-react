import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { presetImages } from './data';

/** 边框 */
const BorderBox: React.FC<IWidgetProps> = ({ options }) => {
  const style: React.CSSProperties = useMemo(() => {
    const img = presetImages.find((m) => m.value === options.borderImg);
    if (!img) return {};

    return {
      background: 'none',
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: 1,
      width: '100%',
      height: '100%',
      borderImage: `url(${img.src}) ${img.border.slice} / ${img.border.width} / ${img.border.outset} ${img.border.repeat}`,
    };
  }, [options]);

  return <div style={style} />;
};

export default BorderBox;
