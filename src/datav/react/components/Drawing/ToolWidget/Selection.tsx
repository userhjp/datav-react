import React, { Fragment, useRef } from 'react';
import { useSelection, useOperation, useToolbar } from '../../../hooks';
import { observer } from '@formily/react';
import { IWidgetSetting } from '../../../interface';
import { ResizeHandler } from './ResizeHandler';
import { NavLine } from './NavLine';
export interface ISelectionBoxProps {
  node: IWidgetSetting;
  showHelpers: boolean;
}

export const SelectionBox: React.FC<ISelectionBoxProps> = observer(({ node }) => {
  const toolbar = useToolbar();
  const ref = useRef<HTMLDivElement>();

  const createSelectionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
    };
    if (node) {
      baseStyle.transform = `perspective(1px) translate3d(${node.attr.x}px,${node.attr.y}px,0)`;
      baseStyle.height = node.attr.h;
      baseStyle.width = node.attr.w;
    }
    return baseStyle;
  };
  if (!node) return null;

  if (!node.attr.w || !node.attr.h) return null;

  return (
    <div className={'aux-selection-box'} style={createSelectionStyle()} ref={ref}>
      {toolbar.toolbox.alignline && <NavLine x={node.attr.x} y={node.attr.y} />}
      <div className={'aux-selection-box-inner'} />
      <ResizeHandler node={node} />
    </div>
  );
});

export const Selection = observer(() => {
  const selection = useSelection();
  const operation = useOperation();
  return (
    <Fragment>
      {selection.selected.map((id) => {
        const node = operation.findById(id);
        if (!node) return null;
        return <SelectionBox key={id} node={node} showHelpers={selection.selected.length === 1} />;
      })}
    </Fragment>
  );
});

Selection.displayName = 'Selection';
