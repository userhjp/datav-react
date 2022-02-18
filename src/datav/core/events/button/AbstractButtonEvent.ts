import { PageType } from '@/datav/react/interface';
import { IEngineContext } from '../../types';

export class AbstractButtonEvent {
  data: PageType;
  context: IEngineContext;

  constructor(data: PageType) {
    this.data = data;
  }
}
