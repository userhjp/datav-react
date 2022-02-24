import React, { useRef } from 'react';
import { useScreen } from '../../../hooks';
import { DashedBox } from './DashedBox';
import { Selection } from './Selection';
import style from './style.less';

export const ToolWidget: React.FC = () => {
  const screen = useScreen();
  const ref = useRef<HTMLDivElement>();

  if (!screen) return null;
  return (
    <div ref={ref} className={style.tool_widget}>
      <DashedBox />
      <Selection />
    </div>
  );
};
