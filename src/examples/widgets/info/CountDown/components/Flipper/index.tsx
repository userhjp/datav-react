import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import './index.less';

type FlipperProps = {
  duration?: number;
  styleVal: any;
};

export type FlipperRef = {
  flip: (type: 'down' | 'up', front: number, back: number) => void;
  setFront: (val: number) => void;
  setBack: (val: number) => void;
};

const Flipper = forwardRef<FlipperRef, FlipperProps>((props, ref) => {
  const { duration = 600, styleVal = {} } = props;
  const time = useRef<NodeJS.Timeout>();
  const [state, setState] = useState({
    frontText: 0,
    backText: 0,
    isFlipping: false,
    flipType: 'down',
  });

  useImperativeHandle(ref, () => ({
    flip,
    setFront: (val: number) => {
      setState({
        ...state,
        frontText: val,
      });
    },
    setBack: (val: number) => {
      setState({
        ...state,
        backText: val,
      });
    },
  }));

  const flip = (type: 'down' | 'up', front: number, back: number) => {
    if (!state.isFlipping) {
      setState({
        frontText: front,
        backText: back,
        isFlipping: true,
        flipType: type,
      });
      time.current = setTimeout(() => {
        setState({
          ...state,
          frontText: back,
          isFlipping: false,
        });
      }, duration);
    }
  };

  const style: React.CSSProperties = useMemo(() => {
    return {
      padding: `${styleVal.horizontalPadding} ${styleVal.horizontalPadding}`,
      backgroundColor: styleVal.backgroundColor,
      borderColor: styleVal.borderColor,
      // '--backgroundcolor': styleVal.backgroundColor,
    };
  }, [styleVal]);

  useEffect(() => {
    return () => clearTimeout(time.current);
  }, []);

  return (
    <div style={style} className={`M-Flipper ${state.flipType} ${state.isFlipping ? 'go' : ''}`}>
      <div className={`digital front ${'number' + state.frontText}`} />
      <div className={`digital back ${'number' + state.backText}`} />
    </div>
  );
});

export default Flipper;
