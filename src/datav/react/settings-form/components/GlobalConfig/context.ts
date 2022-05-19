import { DataSource } from '@/datav/core';
import React from 'react';

export const DrawerContext = React.createContext<{ dataSource: DataSource }>(null);
