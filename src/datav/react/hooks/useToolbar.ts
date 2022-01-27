import { useDesigner } from './useDesigner';

export const useToolbar = () => {
  const designer = useDesigner();
  return designer?.toolbar;
};
