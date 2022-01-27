import { Checkbox, InputNumber, InputNumberProps, InputProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React from 'react';
import './index.less';

type NumberPickerProps = {
  /** 后缀(单位) */
  unit: string | boolean;
  /** 显示自适应Checkbox 且值为非自适应时候的数字默认值 */
  autoValue: number;
  /** 自适应时候回传值 默认 aoto */
  mapAutoValue: string;
};

export const NumberPicker: React.FC<InputNumberProps & NumberPickerProps> = (props) => {
  const { unit, autoValue, mapAutoValue = 'auto', value, min, max, onChange } = props;
  const checkBoxChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked ? mapAutoValue : typeof autoValue === 'number' ? autoValue : '');
  };

  return (
    <div className={`my-input-number ${unit ? 'show-unit' : ''}`}>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputNumber value={value} onChange={onChange} disabled={props.disabled || value === mapAutoValue} min={min} max={max} />
        {unit && value !== mapAutoValue && <span className="number-unit">{unit}</span>}
      </div>
      {typeof autoValue === 'number' && (
        <Checkbox className="number-picker-checkbox" checked={value === mapAutoValue} onChange={checkBoxChange}>
          自适应
        </Checkbox>
      )}
    </div>
  );
};
