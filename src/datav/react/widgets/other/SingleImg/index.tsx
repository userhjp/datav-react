import React, { useMemo } from 'react';
import { IWidgetNode } from '@/datav/react/interface';
import './index.less';

const SingleImg: React.FC<IWidgetNode> = ({ options }) => {
  const linkUrl = options?.link?.href;

  const goPath = () => {
    if (options?.link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  const style: React.CSSProperties = useMemo(() => {
    let background = `url(${options.backgroundImg}) 0% 0% / `;
    let maskSize = '';
    if (options.repeat === 'repeat') {
      background += 'auto repeat';
      maskSize = 'auto';
    } else if (options.repeat === 'repeat-x') {
      background += 'auto 100% repeat-x';
      maskSize = 'auto 100%';
    } else if (options.repeat === 'repeat-y') {
      background += '100% repeat-y';
      maskSize = '100%';
    } else {
      background += '100% 100% no-repeat';
      maskSize = '100% 100%';
    }
    return {
      background,
      imageRendering: '-webkit-optimize-contrast',
      borderRadius: options.borderRadius || 0,
      cursor: linkUrl ? 'pointer' : 'default',
    };
  }, [options]);

  return <div style={style} className="widget-single-img" onClick={linkUrl ? goPath : null} />;
};

export default SingleImg;
