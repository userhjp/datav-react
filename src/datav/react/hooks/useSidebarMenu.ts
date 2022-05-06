import { useContext } from 'react';
import { DesignerLayoutContext } from '../context';

export const useSidebarMenu = () => {
  const designer = useContext(DesignerLayoutContext);
  return designer?.menu;
};
