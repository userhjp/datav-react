import { useFieldSchema } from '@formily/react';
import { SelectProps, Select as AntdSelect } from 'antd';
import React, { useState } from 'react';
import './index.less';

export const Palette: React.FC<SelectProps> = (props) => {
  const fieldSchema = useFieldSchema();
  const [open, setOpen] = useState(false);
  return (
    <AntdSelect
      open={open}
      onMouseDown={(e) => e.preventDefault()}
      onDropdownVisibleChange={(e) => {
        if (e) setOpen(true);
      }}
      {...props}
      onBlur={() => setOpen(false)}
      className="palette-select-dropdown-menu"
      dropdownClassName="palette-select-dropdown"
    >
      {fieldSchema.enum.map((item: any, i) => (
        <AntdSelect.Option key={i} value={item.value}>
          <div
            className="palette-select-dropdown-menu-item"
            key={i}
            role="option"
            style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
            onClick={() => {
              if (props.value !== item.value) {
                props?.onChange(item.value, item);
                setOpen(false);
              }
            }}
          >
            <img className="datav-palette-select-palette" src={item.src} />
            <span title={item.label}>{item.label}</span>
          </div>
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
};
