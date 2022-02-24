import { IconWidget } from '../../../components';
import React from 'react';
import './index.less';

type EmptyProps = {
  title?: string;
  style?: React.CSSProperties;
};

export const Empty: React.FC<EmptyProps> = ({ style, title }) => {
  return (
    <div className="item-empty" style={style}>
      <IconWidget infer="CheckCircle" style={{ fontSize: 22, marginBottom: 16 }} />
      <div>{title}</div>
    </div>
  );
};
