import { Input, InputProps } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

export const BlurInput: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <Input
      {...props}
      value={value}
      className="blur-input"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={(e) => {
        props.onChange(e);
      }}
    />
  );
};
