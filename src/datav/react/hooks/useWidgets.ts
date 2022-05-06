import { useContext } from 'react';
import { DesignerEngineContext } from '../context';

export const useWidgets = () => {
  const designer = useContext(DesignerEngineContext);
  return designer?.components;
};
