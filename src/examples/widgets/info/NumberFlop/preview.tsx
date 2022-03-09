import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useSize } from 'ahooks';
import { calcStrWidth } from '@/examples/shared';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

const NumberFlop: React.FC<IWidgetProps<any>> = ({ options = {}, data }) => {
  const domRef = useRef(null);
  const size = useSize(domRef.current);
  const [animation, setAnimation] = useState(null);

  const titleText = useMemo((): string => {
    return options.titleConfig?.show ? data?.title ?? options.titleConfig?.title : '';
  }, [options.titleConfig]);

  const prefixText = useMemo((): string => {
    const { counter } = options;
    return counter.prefix?.content || '';
  }, [options.prefix?.content]);

  const suffixText = useMemo((): string => {
    const { counter } = options;
    return counter.suffix?.content || '';
  }, [options.counter]);

  const wrapperStyle: React.CSSProperties = useMemo(() => {
    const arrangement = options.global.arrangement;
    let style = {};
    if (arrangement === 'top') {
      style = {
        display: 'block',
        alignItems: 'start',
        flexDirection: 'column',
      };
    } else if (arrangement === 'left') {
      style = {
        display: 'flex',
        alignItems: 'baseline',
        flexDirection: 'row',
      };
    } else if (arrangement === 'bottom') {
      style = {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column-reverse',
      };
    }
    return {
      width: `${size?.width}px`,
      height: `${size?.height}px`,
      ...style,
    };
  }, [options.global]);

  const titleStyle: React.CSSProperties = useMemo(() => {
    if (!options.global) return {};
    const { fontFamily, arrangement } = options.global;
    const { textStyle, distance } = options.titleConfig;

    const style: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      color: textStyle?.color,
      fontWeight: textStyle?.fontWeight as any,
      fontFamily: `${textStyle?.fontFamily || fontFamily}, Arial, sans-serif`,
      fontSize: `${textStyle?.fontSize}px`,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      lineHeight: 'normal',
      margin: '0px',
      justifyContent: textStyle?.textAlign,
      width: '100%',
    };

    if (arrangement === 'top') {
      style.margin = `0px 0px ${distance}px`;
    } else if (arrangement === 'left') {
      style.width = 'auto';
      style.margin = `0px ${distance}px 0px 0px`;
    } else if (arrangement === 'bottom') {
      style.margin = `${distance}px 0px 0px`;
    }
    return style;
  }, [options.global, options.titleConfig]);

  const counterStyle = useMemo(() => {
    const { titleConfig, counter = {}, numbers, global = {} } = options;
    const { textStyle } = titleConfig;
    const style: React.CSSProperties = {
      display: 'flex',
      alignItems: 'baseline',
      color: numbers?.textStyle?.color,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      justifyContent: counter.justifyContent,
      fontFamily: counter.fontFamily,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    };
    const titleFont = `${textStyle?.fontWeight} ${textStyle?.fontSize}px ${global.fontFamily}, Arial, sans-serif`;
    const titleContainerW = calcStrWidth(titleText, titleFont);
    const titleContainerH = textStyle?.fontSize || 0 + 10;
    const arrangement = global.arrangement;
    if (arrangement === 'top' || arrangement === 'bottom') {
      style.width = `${size?.width}px`;
      style.height = `${size?.height - titleContainerH}px`;
    } else if (arrangement === 'left') {
      style.width = `${size?.width - titleContainerW}px`;
      style.height = `${size?.height}px`;
    }
    return style;
  }, [options.counter]);

  const prefixStyle = useMemo(() => {
    const { prefix } = options.counter;
    if (!prefix) return {};
    return {
      marginRight: `${prefix.marginRight}px`,
      color: prefix.color,
      fontSize: `${prefix.fontSize}px`,
      fontWeight: prefix.fontWeight,
      VerticalAlign: 'super',
      fontFamily: options.global?.fontFamily,
    } as React.CSSProperties;
  }, [options.prefix, options.global]);

  const suffixStyle = useMemo(() => {
    const { suffix } = options.counter;
    if (!suffix) return {};
    return {
      marginLeft: `${suffix.marginLeft}px`,
      color: suffix.color,
      fontSize: `${suffix?.fontSize}px`,
      fontWeight: suffix?.fontWeight,
      VerticalAlign: 'super',
      fontFamily: options.global?.fontFamily,
    } as React.CSSProperties;
  }, [options.suffix, options.global]);

  const numberStyle = useMemo(() => {
    const { numbers } = options;
    if (!numbers) return {};
    const style: React.CSSProperties = {
      display: 'inline-block',
      textIndent: '0.02em',
      letterSpacing: numbers.letterSpacing,
      height: 'auto',
      lineHeight: 'normal',
      color: numbers.textStyle?.color,
      backgroundColor: numbers.backgroundColor,
      fontSize: `${numbers.textStyle?.fontSize}px`,
      fontWeight: numbers.textStyle?.fontWeight as any,
      marginRight: `${numbers.marginRight}em`,
      borderRadius: `${numbers.borderRadius}px`,
    };
    if (numbers.fixedWidth > 0) {
      style.width = `${numbers.fixedWidth}px`;
    }
    return style;
  }, [options.numbers]);

  useLayoutEffect(() => {
    const { numbers, animation } = options;
    let value = data?.value ?? (numbers?.decimal || 0);
    if (typeof numbers.divisor === 'number' && numbers.divisor > 1) {
      value = value / numbers.divisor;
    }
    setAnimation({
      Children: {
        value,
        floatLength: numbers?.decimal || 0,
        formatMoney: !!numbers?.separating,
      },
      duration: animation?.duration || 0,
    });
  }, [options.numbers, data]);

  return (
    <div className={'widget-number-flop'} style={wrapperStyle} ref={domRef}>
      <div style={titleStyle}>{titleText}</div>
      <div style={counterStyle}>
        <span style={prefixStyle}>{prefixText}</span>
        <TweenOne animation={animation} style={numberStyle}>
          0
        </TweenOne>
        <span style={suffixStyle}>{suffixText}</span>
      </div>
    </div>
  );
};

export default NumberFlop;
