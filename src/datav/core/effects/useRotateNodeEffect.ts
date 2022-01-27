import { Engine, CursorType } from '../models';
import { DragStartEvent, DragMoveEvent, DragStopEvent } from '../events';
import { ComType } from '@/datav/interface';

/** 组件旋转 先放core 理论上应该放业务代码里 */
export const useRotateEffect = (engine: Engine) => {
  let status = null;
  let startX = 0;
  let startY = 0;
  let startAngle = 0;
  let node: ComType;

  engine.subscribeTo(DragStartEvent, (e) => {
    if (!engine?.viewport) return;
    const el = e.data.target as HTMLElement;

    if (el?.closest('*[data-designer-node-rotate-id]') && el?.getAttribute) {
      const nodeId = el?.getAttribute('data-designer-node-rotate-id');
      if (!nodeId) return;
      node = engine.operation.findById(nodeId);
      const rect = engine.viewport.getElementRectById(nodeId);
      if (!rect) return;
      status = nodeId;
      engine.cursor.setType(status);
      // 获取元素中心点位置
      startX = rect.left + (rect.width * engine.viewport.scale) / 2;
      startY = rect.top + (rect.height * engine.viewport.scale) / 2;
      startAngle = (Math.atan2(startY - e.data.clientY, startX - e.data.clientX) * 180) / Math.PI - node.attr.deg;
    }
  });

  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine?.viewport) return;
    if (!status) return;
    const angle = (Math.atan2(startY - e.data.clientY, startX - e.data.clientX) * 180) / Math.PI - startAngle;
    const deg = Math.round(angle % 360);
    node.attr.deg = deg < 0 ? deg + 360 : deg;
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return;
    status = null;
    engine.cursor.setType(CursorType.Move);
  });
};
