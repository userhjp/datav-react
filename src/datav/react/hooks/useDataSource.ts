import { useDesigner } from './useDesigner';

export const useDataSource = () => {
  const designer = useDesigner();
  return designer?.dataSource;
};
