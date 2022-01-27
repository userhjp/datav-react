import { useOperation } from './useOperation';

export const useSelection = () => {
  const designer = useOperation();
  return designer?.selection;
};
