import { Engine, CursorStatus } from '../models';
import { MouseClickEvent } from '../events';

export const useSelectionEffect = (engine: Engine) => {
  engine.subscribeTo(MouseClickEvent, (event) => {
    if (engine.cursor.status !== CursorStatus.Normal) return;
    const target: HTMLElement = event.data.target as any;
    const el = target?.closest?.(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
    if (!el) {
      const canvasEl = target?.closest?.(`
        *[${engine.props.canvasNodeAttrName}],
        [class="canvas-panel-wrap"]  
      `);
      if (canvasEl) {
        engine.operation.selection.clear();
      }
      return;
    }
    const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
    const structNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
    const node = engine.operation.findById(nodeId || structNodeId);
    if ((node.attr.isLock && !structNodeId) || node.attr.isHide) return;
    const selection = engine.operation.selection;
    const comId = nodeId || structNodeId;
    if (window.event['ctrlKey']) {
      if (selection.has(comId)) {
        if (selection.selected.length > 1) {
          selection.remove(comId);
        }
      } else {
        selection.add(comId);
      }
    } else {
      selection.safeSelect(comId);
    }
  });
};
