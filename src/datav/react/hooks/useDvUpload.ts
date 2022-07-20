import { useDesigner } from './useDesigner';

export const useDvUpload = () => {
  const designer = useDesigner();
  return designer.upload;
};
