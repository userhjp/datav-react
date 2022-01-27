import React from 'react';
import './index.less';

type DividerProps = {
  margin?: number;
};

export const Divider: React.FC<DividerProps> = ({ margin = 10 }) => {
  return <div className="item-divider" style={{ margin }} />;
};
