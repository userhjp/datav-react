import { IEngineContext } from '../../types';

export type DvWidgetEvent = {
  /** 组件ID */
  id: string;
  /** 事件名称 */
  eventName: string;
};

export class AbstractWidgetEvent {
  data: DvWidgetEvent;
  context: IEngineContext;

  constructor(data: DvWidgetEvent) {
    this.data = data;
  }
}
