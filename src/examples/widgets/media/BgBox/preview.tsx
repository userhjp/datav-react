import React, { useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';

/** 自定义背景快 */
const BgBox: React.FC<IWidgetProps> = ({ options }) => {
  const { bgStyle, borderStyle, ...baseStyle } = options;

  const { filter } = baseStyle;
  const bgStyles: React.CSSProperties = {};
  let borderStyles: React.CSSProperties = {};
  switch (bgStyle?.bgType) {
    case 'base':
      bgStyles.backgroundColor = bgStyle.backgroundColor;
      break;
    case 'gradientHorizontal': // 水平渐变
      bgStyles.backgroundImage = `linear-gradient(to right, ${bgStyle.colors.join()})`;
      break;
    case 'gradientVertical': // 垂直
      bgStyles.backgroundImage = `linear-gradient(to bottom, ${bgStyle.colors.join()})`;
      break;
    default:
      break;
  }
  switch (borderStyle?.borderType) {
    case 'base':
      borderStyles = {
        borderColor: borderStyle.baseBorder.borderColor,
        borderStyle: borderStyle.baseBorder.borderStyle,
        borderWidth: borderStyle.baseBorder.borderWidth,
        borderTopLeftRadius: borderStyle.baseBorder.topLeft,
        borderTopRightRadius: borderStyle.baseBorder.topRight,
        borderBottomLeftRadius: borderStyle.baseBorder.tottomLeft,
        borderBottomRightRadius: borderStyle.baseBorder.bottomRight,
      };
      break;
    case 'gradient': // 渐变
      borderStyles = {
        borderStyle: 'solid',
        borderWidth: borderStyle.gradientBorder.borderWidth,
        borderImage: `linear-gradient(${borderStyle.gradientBorder.colors.join()}) ${borderStyle.gradientBorder.borderWidth}`,
      };
      break;
    case 'image': // 图片
      borderStyles = {
        borderStyle: 'solid',
        borderWidth: 2,
        borderImage: `url(${borderStyle.imageBorder.url}) ${borderStyle.imageBorder.slice} / ${borderStyle.imageBorder.width} / ${borderStyle.imageBorder.outset} ${borderStyle.imageBorder.repeat}`,
      };
      break;
    default:
      break;
  }

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...bgStyles,
    ...borderStyles,
    filter: `blur(${filter || 0}px)`,
  };

  return <div style={style} />;
};

export default BgBox;
