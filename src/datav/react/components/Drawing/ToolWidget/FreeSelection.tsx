import React from 'react';
import { useCursor, useScreen, useViewport } from '@/datav/react/hooks';
import { CursorStatus, CursorType } from '@/datav/core';
import { observer } from '@formily/react';
import { calcRectByStartEndPoint } from '@/datav/shared';

export const FreeSelection = observer(() => {
  const cursor = useCursor();
  const viewport = useViewport();
  const screen = useScreen();

  const createSelectionStyle = () => {
    const startDragPoint = viewport.getOffsetPoint({
      x: cursor.dragStartPosition.topClientX,
      y: cursor.dragStartPosition.topClientY,
    });

    const currentPoint = viewport.getOffsetPoint({
      x: cursor.position.topClientX,
      y: cursor.position.topClientY,
    });
    const rect = calcRectByStartEndPoint(
      startDragPoint,
      currentPoint,
      viewport.scrollX - cursor.dragStartScrollOffset.scrollX,
      viewport.scrollY - cursor.dragStartScrollOffset.scrollY
    );
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.2,
      borderWidth: `${1 / screen.scale}px`,
      borderStyle: 'solid',
      borderColor: 'rgba(24, 144, 255, 1)',
      backgroundColor: 'rgba(24, 144, 255, 1)',
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      height: rect.height,
      width: rect.width,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      zIndex: 1,
    };
    return baseStyle;
  };
  if (cursor.status !== CursorStatus.Dragging || cursor.type !== CursorType.Selection) return null;
  return <div style={createSelectionStyle()} />;
});
