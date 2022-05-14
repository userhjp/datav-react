import { IconWidget } from '@/datav/react/components';
import { useFieldSchema } from '@formily/react';
import { SelectProps, Select as AntdSelect } from 'antd';
import React, { useState } from 'react';
import './index.less';

export const Palette: React.FC<any> = (props) => {
  const fieldSchema = useFieldSchema();
  const [open, setOpen] = useState(false);

  const colors = fieldSchema.enum.map((m: any) => m.join());
  const val = props.value.join();

  return (
    <div className="palette-select-dropdown-menu">
      <AntdSelect
        showArrow={false}
        open={open}
        onDropdownVisibleChange={(e) => {
          if (e) setOpen(true);
        }}
        value={val}
        onChange={(value) => {
          if (val !== value) {
            const spval = value.split(',');
            props?.onChange(spval, spval);
          }
        }}
        onBlur={() => setOpen(true)}
        dropdownClassName="palette-select-dropdown"
      >
        {colors.map((arr: string, i) => {
          return (
            <AntdSelect.Option key={i} value={arr}>
              <div
                className="palette-select-dropdown-menu-item"
                key={i}
                style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
              >
                {arr.split(',').map((m, i) => (
                  <span key={i} style={{ backgroundColor: m }} />
                ))}
              </div>
            </AntdSelect.Option>
          );
        })}
      </AntdSelect>
      <IconWidget className="palette-setting" infer="Setting" onClick={() => {}} />
    </div>
  );
};
