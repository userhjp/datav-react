import { useSelected } from './useSelected';
import { useOperation } from './useOperation';

export const useCurrentNode = () => {
  const selected = useSelected();
  const operation = useOperation();
  if (selected.length > 1) return null;
  return operation?.findById?.(selected[0]);
};
