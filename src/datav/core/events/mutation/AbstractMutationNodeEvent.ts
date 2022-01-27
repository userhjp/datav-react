import { IEngineContext } from '../../types';

export interface IMutationNodeEventData {
  // 事件发生的数据源
  source: any;
  // 事件发生的目标对象
  target: any;
  // 事件发生的来源对象
  originSourceParents?: any;
  // 扩展数据
  extra?: any;
}

export class AbstractMutationNodeEvent {
  data: IMutationNodeEventData;
  context: IEngineContext;
  constructor(data: IMutationNodeEventData) {
    this.data = data;
  }
}
