import { createContext } from 'react';
import { Engine } from '../core';
import { IDesignerContext, IDesignerLayoutContext } from './types';

export const DesignerEngineContext = createContext<IDesignerContext>(null);

export const DesignerLayoutContext = createContext<IDesignerLayoutContext>(null);
