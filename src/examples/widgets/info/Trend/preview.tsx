import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { images } from './data';
import './styles.less';

const formatNumber = (value: number | string, str: string) => {
  str = /[0-9]/.test(str) ? '' : str;
  if (!str) return value;

  const val = `${value}`;
  const list = val.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `${str}${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

const Trend: React.FC<IWidgetProps> = ({ options, data }) => {
  const { titleStyle, iconStyle, numStyle } = options;
  const img = images.find((m) => m.value === iconStyle.image);
  let status: 'up' | 'down' | 'flat' = 'flat';
  const baseVal = data.base || numStyle.baseNum || 0;
  const value = (data?.value || 0) - baseVal;
  const valueText = value.toFixed(numStyle.rounding ? 0 : numStyle.decimal) || '-';

  const deg = {
    up: 0,
    down: 180,
    flat: 0,
  };

  const color = {
    up: iconStyle.upColor,
    down: iconStyle.downColor,
    flat: iconStyle.flatColor,
  };

  if (value > 0) {
    status = 'up';
  } else if (value < 0) {
    status = 'down';
  } else {
    status = 'flat';
  }

  const titleStyles: React.CSSProperties = {
    flex: 1,
    textAlign: 'right',
    ...titleStyle.textStyle,
    ...(titleStyle.isWrap
      ? {
          whiteSpace: 'normal',
          wordBreak: 'breakAll',
          lineHeight: 1.4,
        }
      : {}),
  };

  const valueStyle = {
    ...numStyle.textStyle,
    ...(iconStyle.syncColor
      ? {
          color: color[status],
        }
      : {}),
    flex: 1,
  };

  const imgStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: '0 4px',
    imageRendering: '-webkit-optimize-contrast',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    WebkitMaskPosition: 'center',
    WebkitMaskImage: `url(${img.src})`,
    backgroundColor: color[status],
    width: iconStyle.size,
    height: iconStyle.size,
    transform: `rotateX(${deg[status]}deg)`,
  };

  return (
    <div className="widget-trend-comp">
      <span style={titleStyles}>{titleStyle.content}</span>
      <span style={imgStyle} />
      <span style={valueStyle}>
        {formatNumber(valueText, numStyle.thousandth)}
        {numStyle.suffix}
      </span>
    </div>
  );
};

export default Trend;
