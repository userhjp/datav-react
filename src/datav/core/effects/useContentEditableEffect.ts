import { Engine } from '../models';
import { MouseDoubleClickEvent } from '../events';

export const useContentEditableEffect = (engine: Engine) => {
  engine.subscribeTo(MouseDoubleClickEvent, (event) => {
    const target = event.data.target as Element;
    const editableElement = target?.closest?.(`*[${engine.props.contentEditableAttrName}]`) as HTMLInputElement;
    if (!editableElement) return;
    const nodeId = editableElement?.getAttribute(engine.props.contentEditableAttrName);
    engine.operation.rename(nodeId);
  });
};
