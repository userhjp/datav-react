import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { decorateImgList } from './data';

const Decorate: React.FC<IWidgetProps> = ({ options }) => {
  const style: React.CSSProperties = useMemo(() => {
    const img = decorateImgList.find((m) => m.value === options.borderImg);
    if (!img) return {};
    return {
      width: '100%',
      height: '100%',
      imageRendering: '-webkit-optimize-contrast',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: '100% 100%',
      WebkitMaskImage: `url(${img.src})`,
      backgroundColor: options.backgroundColor,
    };
  }, [options]);

  return <div style={style} />;
};

export default Decorate;
