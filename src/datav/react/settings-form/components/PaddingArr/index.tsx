import { observer } from '@formily/react';
import { InputNumber, InputProps } from 'antd';
import React, { useState } from 'react';
import './index.less';

export const PaddingArr: React.FC<InputProps & { onChange: (val: number[]) => void }> = observer(({ value, onChange, defaultValue }) => {
  const [top, setTop] = useState(value ? value[0] || 0 : 0);
  const [left, setLeft] = useState(value ? value[1] || 0 : 0);
  const [right, setRight] = useState(value ? value[2] || 0 : 0);
  const [bottom, setBottom] = useState(value ? value[3] || 0 : 0);
  const valChange = () => {
    const arr = [top || 0, right || 0, bottom || 0, left || 0];
    onChange(arr);
  };

  return (
    <div className="padding-arr">
      <div className="top">
        <InputNumber
          value={top}
          onChange={(e) => {
            setTop(e);
          }}
          onBlur={valChange}
          size="small"
          max={999}
          min={0}
          controls={false}
        />
      </div>
      <div className="left">
        <InputNumber
          value={left}
          onChange={(e) => {
            setLeft(e);
          }}
          onBlur={valChange}
          size="small"
          max={999}
          min={0}
          controls={false}
        />
      </div>
      <div className="right">
        <InputNumber
          value={right}
          onChange={(e) => {
            setRight(e);
          }}
          onBlur={valChange}
          size="small"
          max={999}
          min={0}
          controls={false}
        />
      </div>
      <div className="bottom">
        <InputNumber
          value={bottom}
          onChange={(e) => {
            setBottom(e);
          }}
          onBlur={valChange}
          size="small"
          max={999}
          min={0}
          controls={false}
        />
      </div>
    </div>
  );
});
