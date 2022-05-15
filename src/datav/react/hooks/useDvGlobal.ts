import { useDesigner } from './useDesigner';

export const useDvGlobal = () => {
  const designer = useDesigner();
  return designer?.global;
};
