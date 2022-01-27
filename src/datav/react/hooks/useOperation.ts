import { useDesigner } from './useDesigner';

export const useOperation = () => {
  const designer = useDesigner();
  return designer?.operation;
};
