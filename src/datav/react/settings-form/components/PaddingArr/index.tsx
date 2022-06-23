import { observer, useField } from '@formily/react';
import { InputNumber, InputProps } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

type ObjValType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const PaddingArr: React.FC<InputProps & { value: number[] | ObjValType; onChange: (val: number[] | ObjValType) => void }> = observer(
  ({ value, onChange }) => {
    const [state, setState] = useState({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });

    const field = useField();

    useEffect(() => {
      if (field.displayName === 'ArrayField') {
        const arr = Array.isArray(value) ? value : [];
        setState({
          top: arr[0] || 0,
          right: arr[1] || 0,
          bottom: arr[2] || 0,
          left: arr[3] || 0,
        });
      } else {
        const obj: any = value || {};
        setState({
          top: obj.top || 0,
          right: obj.right || 0,
          bottom: obj.bottom || 0,
          left: obj.left || 0,
        });
      }
    }, [value]);

    const valChange = () => {
      if (field.displayName === 'ArrayField') {
        const arr = [state.top, state.right, state.bottom, state.left];
        onChange(arr);
      } else {
        debugger;
        onChange(state);
      }
    };

    return (
      <div className="padding-arr">
        <div className="top">
          <InputNumber
            value={state.top}
            onChange={(e) => setState((state) => ({ ...state, top: e }))}
            onBlur={valChange}
            size="small"
            max={999}
            min={0}
            controls={false}
          />
        </div>
        <div className="left">
          <InputNumber
            value={state.left}
            onChange={(e) => setState((state) => ({ ...state, left: e }))}
            onBlur={valChange}
            size="small"
            max={999}
            min={0}
            controls={false}
          />
        </div>
        <div className="right">
          <InputNumber
            value={state.right}
            onChange={(e) => setState((state) => ({ ...state, right: e }))}
            onBlur={valChange}
            size="small"
            max={999}
            min={0}
            controls={false}
          />
        </div>
        <div className="bottom">
          <InputNumber
            value={state.bottom}
            onChange={(e) => setState((state) => ({ ...state, bottom: e }))}
            onBlur={valChange}
            size="small"
            max={999}
            min={0}
            controls={false}
          />
        </div>
      </div>
    );
  }
);
