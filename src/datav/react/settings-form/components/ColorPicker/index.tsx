import { Input } from '@formily/antd';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

type ColorPickerProps = {
  value: string;
  onChange: (val: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value, onChange } = props;
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(value || '');
  const handleColorChange = (color: any) => {
    const rgb = color.rgb;
    const val = rgb.a === 1 ? color.hex : `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    setColor(rgb);
    onChange(val);
  };

  useEffect(() => {
    const handle = () => {
      setVisible(false);
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);

  return (
    <div className="color-picker" onClick={(e) => e.stopPropagation()}>
      <Input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        addonAfter={<div style={{ backgroundColor: value, width: 20, height: 16 }} onClick={() => setVisible(!visible)} />}
      />
      {visible && <SketchPicker className="sketch-picker" color={color} onChange={handleColorChange} />}
    </div>
  );
};
