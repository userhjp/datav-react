import { useContext } from 'react';
import { DesignerEngineContext } from '../context';

export const useMaterial = () => {
  const designer = useContext(DesignerEngineContext);
  return designer?.material || [];
};
