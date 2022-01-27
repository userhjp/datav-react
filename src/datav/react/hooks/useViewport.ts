import { useDesigner } from './useDesigner';

export const useViewport = () => {
  const designer = useDesigner();
  return designer?.viewport;
};
