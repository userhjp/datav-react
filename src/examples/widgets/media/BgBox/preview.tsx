import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';

/** 自定义背景快 */
const BgBox: React.FC<IWidgetProps> = ({ options }) => {
  const { bgStyle, borderStyle, ...baseStyle } = options;
  const gradientStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    borderStyle: 'solid',
    bordeWidth: '13px',
    bordeimage:
      'linear-gradient(135deg, rgb(0, 177, 255) 4%, rgb(0, 197, 255) 30%, rgb(0, 190, 255) 39%, rgb(0, 168, 255) 66%, rgb(0, 163, 255) 72%, rgb(24, 206, 233) 78%, rgb(0, 154, 255) 83%, rgb(0, 146, 255) 92%, rgb(0, 139, 255) 100%) 10 / 13px / 0 stretch',
  };

  const style: React.CSSProperties = useMemo(() => {
    const { filter } = baseStyle;
    const bgStyles: React.CSSProperties = {};
    const borderStyle: React.CSSProperties = {};
    switch (bgStyle?.bgType) {
      case 'base':
        // eslint-disable-next-line no-self-assign
        bgStyles.backgroundColor = bgStyle.backgroundColor;
        break;
      case 'gradientHorizontal': // 水平渐变
        bgStyles.backgroundImage = `linear-gradient(to right, ${bgStyle.colors.join()})`;
        break;
      case 'gradientVertical': // 垂直
        bgStyles.backgroundImage = `linear-gradient(to top, ${bgStyle.colors.join()})`;
        break;
      default:
        break;
    }
    return {
      // background: 'none',
      // borderRadius: 0,
      // borderStyle: 'solid',
      // borderWidth: 1,
      width: '100%',
      height: '100%',
      // borderImage: `url(${img.src}) ${img.border.slice} / ${img.border.width} / ${img.border.outset} ${img.border.repeat}`,
      ...bgStyles,
      ...borderStyle,
      filter: `blur(${filter || 0}px)`,
    };
  }, [options]);

  return <div style={style} />;
};

export default BgBox;
