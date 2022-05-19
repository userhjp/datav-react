import { autorun, reaction } from '@formily/reactive';
import { useEffect } from 'react';
import { Engine } from '../../core/models';
import { useDvGlobal } from './useDvGlobal';

export const useGlobalSource = () => {
  const dvGlobal = useDvGlobal();
  return reaction(() => {
    console.log(dvGlobal.enableDataSources.length);
  });
};
