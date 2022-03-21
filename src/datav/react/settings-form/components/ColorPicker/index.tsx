import { Input } from '@formily/antd';
import { useDebounceFn } from 'ahooks';
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
  const [color, setColor] = useState<any>();
  const [colorText, setColorText] = useState<any>(value || '');
  const { run } = useDebounceFn(
    () => {
      onChange(colorText);
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    setColorText(value);
  }, [value]);

  const handleColorChange = (color: any) => {
    const rgb = color.rgb;
    const val = rgb.a === 1 ? color.hex : `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    setColor(rgb);
    setColorText(val);
    run();
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
        value={colorText}
        onChange={(e) => {
          setColorText(e.target.value);
          run();
        }}
        addonAfter={<div style={{ backgroundColor: value, width: 20, height: 16 }} onClick={() => setVisible(!visible)} />}
      />
      {visible && <SketchPicker className="sketch-picker" color={color} onChange={handleColorChange} />}
    </div>
  );
};
