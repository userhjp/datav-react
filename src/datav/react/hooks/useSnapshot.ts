import { useDesigner } from './useDesigner';

export const useSnapshot = () => {
  const designer = useDesigner();
  return designer.snapshot;
};
