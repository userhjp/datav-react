import { Input, InputProps } from 'antd';
import React from 'react';
import './index.less';

export const BlurInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      className="blur-input"
      onChange={() => {}}
      onBlur={(e) => {
        props.onChange(e);
      }}
    />
  );
};
