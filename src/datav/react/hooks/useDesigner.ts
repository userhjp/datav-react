import { DesignerEngineContext } from '../context';
import { useContext, useEffect } from 'react';
import { Engine } from '../../core';
import { isFn } from '../../shared';
export interface IEffects {
  (engine: Engine): void;
}
export const useDesigner = (effects?: IEffects): Engine => {
  const designer = useContext(DesignerEngineContext);
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer);
    }
  }, []);
  return designer;
};
