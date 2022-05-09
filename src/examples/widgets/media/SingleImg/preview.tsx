import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';

const SingleImg: React.FC<IWidgetProps> = ({ options }) => {
  const linkUrl = options?.link?.href;
  const goPath = () => {
    if (!linkUrl) return;
    if (options?.link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  //   image-rendering: -webkit-optimize-contrast;
  //   background: url(https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png) 0% 0% / auto repeat;
  //   -webkit-mask-repeat: initial;
  //   -webkit-mask-size: initial;
  //   border-radius: 0px;
  //   cursor: default;
  //   -webkit-mask-image: none;

  //   image-rendering: -webkit-optimize-contrast;
  //   background: rgb(36, 131, 255);
  //   -webkit-mask-repeat: repeat;
  //   -webkit-mask-size: auto;
  //   border-radius: 0px;
  //   cursor: default;
  //   -webkit-mask-image: url(//cdn-upload.datav.aliyun.com/upload/download/1624523362248-O1CN01owmQdC1eG8lmTv8yv_!!6000000003843-2-tps-1920-552.png);

  const style: React.CSSProperties = useMemo(() => {
    let maskSize = 'initial';
    let background = '';
    let WebkitMaskImage = 'none';
    if (options.imgType === 'svg') {
      if (options.repeat === 'repeat') {
        maskSize = 'auto';
      } else if (options.repeat === 'repeat-x') {
        maskSize = 'auto 100%';
      } else if (options.repeat === 'repeat-y') {
        maskSize = '100%';
      } else {
        maskSize = '100% 100%';
      }
      background = options.svgColor;
      WebkitMaskImage = `url(${options.svg})`;
    } else {
      background = `url(${options.backgroundImg}) 0% 0% / `;
      if (options.repeat === 'repeat') {
        background += 'auto repeat';
      } else if (options.repeat === 'repeat-x') {
        background += 'auto 100% repeat-x';
      } else if (options.repeat === 'repeat-y') {
        background += '100% repeat-y';
      } else {
        background += '100% 100% no-repeat';
      }
    }
    return {
      background,
      WebkitMaskImage,
      WebkitMaskSize: maskSize,
      imageRendering: '-webkit-optimize-contrast',
      borderRadius: options.borderRadius || 0,
      cursor: linkUrl ? 'pointer' : 'default',
      width: '100%',
      height: '100%',
    };
  }, [options]);

  return <div style={style} onClick={linkUrl ? goPath : null} />;
};

export default SingleImg;
