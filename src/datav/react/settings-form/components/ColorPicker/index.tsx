import { Input } from '@formily/antd';
import { observer } from '@formily/react';
import { useDebounceFn } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

function checkIsColor(bgVal) {
  let type = '';
  if (/^rgb\(/.test(bgVal)) {
    // 如果是rgb开头，200-249，250-255，0-199
    type = '^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$';
  } else if (/^rgba\(/.test(bgVal)) {
    // 如果是rgba开头，判断0-255:200-249，250-255，0-199 判断0-1：0 1 1.0 0.0-0.9
    type = '^[rR][gG][Bb][Aa][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[)]{1}$';
  } else if (/^#/.test(bgVal)) {
    // 六位或者三位
    type = '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$';
  } else if (/^hsl\(/.test(bgVal)) {
    // 判断0-360 判断0-100%(0可以没有百分号)
    type =
      '^[hH][Ss][Ll][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[)]$';
  } else if (/^hsla\(/.test(bgVal)) {
    type =
      '^[hH][Ss][Ll][Aa][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[)]$';
  }
  const re = new RegExp(type);
  if (bgVal.match(re) == null) {
    return true;
  } else {
    return false;
  }
}

type ColorPickerProps = {
  value: string;
  styleType?: number;
  onChange: (val: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = observer((props) => {
  const { value, styleType = 1, onChange, ...propss } = props;
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState<any>();
  const [colorText, setColorText] = useState<any>(value || '');
  const { run } = useDebounceFn(
    () => {
      setColor(colorText);
      onChange(colorText);
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    setColorText(value);
    setColor(value);
  }, [value]);

  const handleColorChange = (color: any) => {
    const rgb = color.rgb;
    const val = rgb.a === 1 ? color.hex : `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    setColor(rgb);
    setColorText(val);
    run();
  };

  const renderColorItem = <div style={{ backgroundColor: colorText, width: 20, height: 16 }} onClick={() => setVisible(!visible)} />;

  return (
    <div className="color-picker" tabIndex={-1} onBlur={() => setVisible(false)} onClick={(e) => e.stopPropagation()}>
      <Input
        {...propss}
        value={colorText}
        onChange={(e) => {
          setColorText(e.target.value);
          if (!checkIsColor(e.target.value)) {
            run();
          } else {
          }
        }}
        addonAfter={styleType === 1 && renderColorItem}
        addonBefore={styleType === 2 && renderColorItem}
      />
      {visible && (
        <SketchPicker
          className="sketch-picker"
          width="166px"
          presetColors={[
            '#D0021B',
            '#F5A623',
            '#F8E71C',
            '#8B572A',
            '#7ED321',
            '#417505',
            '#BD10E0',
            '#9013FE',
            '#4A90E2',
            '#50E3C2',
            '#B8E986',
            '#4A4A4A',
            '#9B9B9B',
            '#FFFFFF',
          ]}
          color={color}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
});
