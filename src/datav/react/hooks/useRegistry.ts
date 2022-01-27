import { GlobalRegistry, IDesignerRegistry } from '../../core/registry';

export const useRegistry = (): IDesignerRegistry => {
  return window['__DATAV_REGISTRY__'] || GlobalRegistry;
};
