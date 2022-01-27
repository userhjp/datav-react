import { useOperation } from './useOperation';

export const useHover = () => {
  const operation = useOperation();
  return operation?.hover;
};
