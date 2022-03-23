import { InputNumber, InputNumberProps } from 'antd';
import React, { useMemo, useState } from 'react';
import './index.less';

const getNum = (val: string | number) => {
  const num = Number.parseFloat(`${val}`);
  return isNaN(num) ? 0 : num;
};

const getUnit = (val: string | number) => {
  if (val === 'auto') return 'auto';
  const unit = `${val}`.replace(/[0-9]*/g, '').replace(/\./, '');
  return unit;
};

type NumberPickerUnitProps = {
  /** 后缀(单位) */
  unit?: string | Array<'px' | '%' | 'auto'>;
};

export const NumberPickerUnit: React.FC<InputNumberProps & NumberPickerUnitProps> = (props) => {
  const { unit, value, min, max, onChange } = props;
  const [current, setCurrent] = useState(getUnit(value));
  const transformOnChangeValue = (type: string, val?: any) => {
    return `${getNum(`${val || value}`)}${type}`;
  };

  const types = useMemo<string[]>(() => {
    if (!unit) return [];
    return typeof unit === 'string' ? [unit] : unit;
  }, []);

  const getNextType = () => {
    const currentIndex = types?.findIndex((type) => type === current);
    const nextIndex = currentIndex + 1 > types?.length - 1 ? 0 : currentIndex + 1;
    return types[nextIndex];
  };

  return (
    <div className={`my-input-number-unit ${unit ? 'show-unit' : ''}`}>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputNumber value={getNum(`${value}`)} onChange={(e) => onChange(transformOnChangeValue(current, e))} min={min} max={max} />
        {current && (
          <span
            className="number-unit"
            style={{ color: '#fff', cursor: 'pointer' }}
            onClick={() => {
              const nextType = getNextType();
              if (nextType === current) return;
              setCurrent(nextType);
              onChange(transformOnChangeValue(nextType));
            }}
          >
            {current}
          </span>
        )}
      </div>
    </div>
  );
};
