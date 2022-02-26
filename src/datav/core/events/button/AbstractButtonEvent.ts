import { IPageType } from '../../../react/interface';
import { IEngineContext } from '../../types';

export class AbstractButtonEvent {
  data: IPageType;
  context: IEngineContext;

  constructor(data: IPageType) {
    this.data = data;
  }
}
