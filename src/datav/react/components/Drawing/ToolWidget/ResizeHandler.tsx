import React, { CSSProperties, Fragment, useMemo, useRef } from 'react';
import { useScreen, useDesigner } from '../../../hooks';
import { IWidgetSetting } from '../../../interface';
import { Direction, getCursors } from '../../../../shared/transform';
import { observer } from '@formily/react';
import './style.less';
export interface ISelectionBoxProps {
  node: IWidgetSetting;
}

export const ResizeHandler: React.FC<ISelectionBoxProps> = observer(({ node }) => {
  const screen = useScreen();
  const domRef = useRef<HTMLDivElement>();
  const designer = useDesigner();
  const cursor = useMemo(() => getCursors(node.attr.deg), [node.attr.deg]);

  const points = useMemo<{
    [k in Direction]: {
      name: string;
      style: Partial<CSSProperties>;
      rotateStyle?: Partial<CSSProperties>;
    };
  }>(() => {
    const transform = `scale(${1 / screen.scale}, ${1 / screen.scale})`;
    return {
      t: {
        name: 'top',
        style: { cursor: cursor.t, transform, pointerEvents: 'auto' },
      },
      rt: {
        name: 'top-right',
        style: { cursor: cursor.rt, pointerEvents: 'auto' },
        rotateStyle: { transformOrigin: '25% 75%', transform, pointerEvents: 'auto' },
      },
      r: {
        name: 'right',
        style: { cursor: cursor.r, transform, pointerEvents: 'auto' },
      },
      rb: {
        name: 'bottom-right',
        style: { cursor: cursor.rb, pointerEvents: 'auto' },
        rotateStyle: { transformOrigin: '25% 25%', transform, pointerEvents: 'auto' },
      },
      b: {
        name: 'bottom',
        style: { cursor: cursor.b, transform, pointerEvents: 'auto' },
      },
      lb: {
        name: 'bottom-left',
        style: { cursor: cursor.lb, pointerEvents: 'auto' },
        rotateStyle: { transformOrigin: '75% 25%', transform, pointerEvents: 'auto' },
      },
      l: {
        name: 'left',
        style: { cursor: cursor.l, transform, pointerEvents: 'auto' },
      },
      lt: {
        name: 'top-left',
        style: { cursor: cursor.lt, pointerEvents: 'auto' },
        rotateStyle: { transformOrigin: '75% 75%', transform, pointerEvents: 'auto' },
      },
    };
  }, [cursor, screen.scale]);

  const style: React.CSSProperties = {
    transform: `rotate(${node.attr.deg}deg)`,
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  const resizeHandler = {
    [designer.props?.nodeResizeHandlerAttrName]: node.id,
  };

  const rotateHander = {
    [designer.props?.nodeRotateHanderAttrName]: node.id,
  };

  return (
    <div ref={domRef} style={style}>
      {Object.keys(points).map((key: string) => {
        const v = points[key];
        return (
          <Fragment key={key}>
            {v.rotateStyle ? (
              <i className={`${v.name}-handler`} data-html2canvas-ignore>
                <span className="rotate-handler" style={v.rotateStyle} {...rotateHander}>
                  <span className="control-point" style={v.style} {...resizeHandler} {...{ 'direction-type': key }} />
                </span>
              </i>
            ) : (
              <i className={`${v.name}-handler`} data-html2canvas-ignore>
                <span className="control-point" style={v.style} {...resizeHandler} {...{ 'direction-type': key }} />
              </i>
            )}
          </Fragment>
        );
      })}
    </div>
  );
});
