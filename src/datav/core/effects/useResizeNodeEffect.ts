import { Engine, CursorType, CursorDragType } from '../models';
import { DragStartEvent, DragMoveEvent, DragStopEvent } from '../events';
import { IWidgetAttrSetting, IWidgetSetting } from '../../react/interface';
import { toJS } from '@formily/reactive';
import { Direction, IPoint, Point } from '../../shared';

/** 组件大小调整 */
export const useResizeNodeEffect = (engine: Engine) => {
  let status: Direction = null;
  let startPoint: IPoint = {
    x: 0,
    y: 0,
  };
  let attr: IWidgetAttrSetting;
  let node: IWidgetSetting;

  engine.subscribeTo(DragStartEvent, (e) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    const el = e.data.target as HTMLElement;
    if (el?.closest(`*[${engine.props?.nodeResizeHandlerAttrName}]`)) {
      const nodeId = el?.getAttribute(`${engine.props?.nodeResizeHandlerAttrName}`);
      status = el?.getAttribute('direction-type') as Direction;
      node = engine.operation.findById(nodeId);
      engine.cursor.setDragType(CursorDragType.Resize);
      startPoint = new Point(e.data.clientX, e.data.clientY);
      attr = toJS(node.attr);
    }
  });

  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine?.viewport) return;
    if (!status) return;
    const pos = Object.create(null) as Partial<IWidgetAttrSetting>;
    const curPositon = new Point(e.data.clientX, e.data.clientY);
    const scale = engine.viewport.scale;
    if (status === 't') {
      pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale);
      pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale);
    } else if (status === 'rt') {
      pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale);
      pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale);
      pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale);
    } else if (status === 'r') {
      pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale);
    } else if (status === 'rb') {
      pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale);
      pos.w = Math.round(attr.w + (curPositon.x - startPoint.x) / scale);
    } else if (status === 'b') {
      pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale);
    } else if (status === 'lb') {
      pos.h = Math.round(attr.h + (curPositon.y - startPoint.y) / scale);
      pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale);
      pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale);
    } else if (status === 'l') {
      pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale);
      pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale);
    } else if (status === 'lt') {
      pos.h = Math.round(attr.h + (startPoint.y - curPositon.y) / scale);
      pos.w = Math.round(attr.w + (startPoint.x - curPositon.x) / scale);
      pos.x = Math.round(attr.x + (curPositon.x - startPoint.x) / scale);
      pos.y = Math.round(attr.y + (curPositon.y - startPoint.y) / scale);
    }
    node.attr = { ...node.attr, ...pos };
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return;
    status = null;
    engine.cursor.setDragType(CursorDragType.Normal);
  });
};
