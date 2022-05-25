import { IGlobalColor } from '@/datav/core';
import { useDvGlobal } from '@/datav/react/hooks';
import { observer, useField } from '@formily/react';
import { Select as AntdSelect, Collapse, InputNumberProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { ColorArrayForm } from '../GlobalConfig/GlobalColors';
import './index.less';

/** 转换echart颜色对象 */
function toEChartColors(colors: IGlobalColor): string | object {
  return colors.map((m) => {
    if (m.type === 'base') return m.baseColor;
    return {
      type: 'linear',
      x: 0,
      y: m.type === 'vertical' ? 1 : 0,
      x2: m.type === 'horizontal' ? 1 : 0,
      y2: 0,
      colorStops: [
        { offset: 0, color: m.baseColor || m.baseColor || '#0098d9' }, // 0% 处的颜色
        { offset: 1, color: m.gradualColor || m.baseColor || '#0098d9' }, // 100% 处的颜色
      ],
      global: false,
    };
  });
}

/** Echart颜色转换为配置对象 */
function toConfigColors(colors: any[]): IGlobalColor {
  const colorList = colors.map((m) => {
    const baseColor = m || '';
    const isStr = typeof baseColor === 'string';
    return {
      baseColor: isStr ? m : m.colorStops?.[0].color,
      gradualColor: isStr ? m : m.colorStops?.[1].color,
      type: isStr ? 'base' : m.y ? 'vertical' : 'horizontal',
    };
  });
  return colorList;
}

export const Palette: React.FC<any> = observer(({ value, onChange }) => {
  const dvGlobal = useDvGlobal();
  const field = useField();

  const currentColors = useMemo(() => {
    return value ? toConfigColors(value) : dvGlobal.colors[0];
  }, [value]);
  const handleChange = (colors: IGlobalColor) => {
    onChange(toEChartColors(colors));
  };
  return (
    <div className="palette-select-dropdown-menu">
      <Collapse className="palette-collapse" expandIconPosition="right" ghost>
        <Collapse.Panel
          header={
            <ColorSelect
              style={{ width: '254px', display: 'flex' }}
              colors={dvGlobal.colors}
              title={field.title}
              value={'current'}
              currentColors={currentColors}
              onChange={(e) => handleChange(dvGlobal.colors[e])}
            />
          }
          key="1"
        >
          <ColorArrayForm value={currentColors} compColor onChange={(e) => handleChange(e)} />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});

const ColorSelect: React.FC<InputNumberProps & { title?: string; colors: IGlobalColor[]; currentColors: IGlobalColor }> = (props) => {
  const { value, onChange, title, colors, style, currentColors } = props;
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'block', alignItems: 'center', width: '100%', ...(style || {}) }} onClick={(e) => e.stopPropagation()}>
      {title && <span style={{ paddingRight: 20 }}>{title}</span>}
      <AntdSelect
        style={{ minWidth: 0, flex: 1 }}
        virtual={false}
        showArrow={false}
        open={open}
        onDropdownVisibleChange={(e) => {
          if (e) setOpen(true);
        }}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
          setOpen(false);
        }}
        onBlur={() => setOpen(false)}
        dropdownClassName="palette-select-dropdown"
      >
        <AntdSelect.OptGroup label="当前映射">
          <AntdSelect.Option disabled value="current">
            <div
              className="palette-select-dropdown-menu-item"
              style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
            >
              {currentColors.map((m, i) => {
                const cStyle: React.CSSProperties = {};
                switch (m.type) {
                  case 'horizontal':
                    cStyle.backgroundImage = `linear-gradient(to right, ${m.baseColor}, ${m.gradualColor})`;
                    break;
                  case 'vertical':
                    cStyle.backgroundImage = `linear-gradient(to top, ${m.baseColor}, ${m.gradualColor})`;
                    break;
                  default:
                    cStyle.backgroundColor = m.baseColor;
                    break;
                }
                return <span key={i} style={cStyle} />;
              })}
            </div>
          </AntdSelect.Option>
        </AntdSelect.OptGroup>
        <AntdSelect.OptGroup label="选择模板">
          {colors.map((item, i) => {
            return (
              <AntdSelect.Option key={i} value={i}>
                <div
                  className="palette-select-dropdown-menu-item"
                  key={i}
                  style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  {item.map((m, i) => {
                    const cStyle: React.CSSProperties = {};
                    switch (m.type) {
                      case 'horizontal':
                        cStyle.backgroundImage = `linear-gradient(to right, ${m.baseColor}, ${m.gradualColor})`;
                        break;
                      case 'vertical':
                        cStyle.backgroundImage = `linear-gradient(to top, ${m.baseColor}, ${m.gradualColor})`;
                        break;
                      default:
                        cStyle.backgroundColor = m.baseColor;
                        break;
                    }
                    return <span key={i} style={cStyle} />;
                  })}
                </div>
              </AntdSelect.Option>
            );
          })}
        </AntdSelect.OptGroup>
      </AntdSelect>
    </div>
  );
};
