import { observer } from '@formily/react';
import React from 'react';
import { useHover, useScreen, useSelection, useToolbar } from '../../../hooks';
import { ResizeHandler } from './ResizeHandler';

export const DashedBox = observer(() => {
  const hover = useHover();
  const screen = useScreen();
  // const toolbar = useToolbar();
  const selection = useSelection();
  // const rect = useValidNodeOffsetRect(hover?.node);
  const createTipsStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      visibility: 'hidden',
      zIndex: 2,
      borderWidth: `${1 / screen.scale}px`,
    };
    if (hover.node) {
      baseStyle.transform = `perspective(1px) translate3d(${hover.node.attr.x}px,${hover.node.attr.y}px,0)`;
      baseStyle.height = hover.node.attr.h;
      baseStyle.width = hover.node.attr.w;
      baseStyle.visibility = 'visible';
    }
    return baseStyle;
  };
  if (!hover.node) return null;
  if (selection.selected.includes(hover.node.id)) return null;

  return (
    <div className="dashed_box" style={createTipsStyle()}>
      <ResizeHandler node={hover.node} />
    </div>
  );
});
