import { useScreen } from '@/datav/react/hooks';
import { observer } from '@formily/react';
import React from 'react';

type NavLineProps = {
  x: number;
  y: number;
};

export const NavLine: React.FC<NavLineProps> = observer((props) => {
  const screen = useScreen();
  const topLineStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: 0,
    borderLeft: `${1.2 / screen.scale}px dashed #2483ff`,
    transform: 'translateY(-100%)',
    height: `${props.y + 60 / screen.scale}px`,
  };

  const leftLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    height: 0,
    borderTop: `${1.2 / screen.scale}px dashed #2483ff`,
    transform: 'translateX(-100%)',
    width: `${props.x + 60 / screen.scale}px`,
  };

  const accountStyle: React.CSSProperties = {
    position: 'absolute',
    color: '#2483ff',
    whiteSpace: 'nowrap',
    textShadow: '1px 1px 1px #222',
    transform: 'translate(-100%, -100%)',
    fontSize: `${12 / screen.scale}px`,
    top: `-${6 / screen.scale}px`,
    left: `-${6 / screen.scale}px`,
  };

  const navLineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'content-box',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  return (
    <div style={navLineStyle}>
      <div style={topLineStyle} />
      <div style={leftLineStyle} />
      <div style={accountStyle}>
        {props.x}, {props.y}
      </div>
    </div>
  );
});
