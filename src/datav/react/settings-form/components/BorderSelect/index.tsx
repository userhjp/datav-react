import { useFieldSchema } from '@formily/react';
import { Select as AntdSelect } from 'antd';
import React, { useState } from 'react';
import './index.less';

export const BorderSelect: React.FC = (props) => {
  const fieldSchema = useFieldSchema();
  const [open, setOpen] = useState(false);

  return (
    <AntdSelect
      open={open}
      onDropdownVisibleChange={(e) => {
        if (e) setOpen(true);
      }}
      {...props}
      // onBlur={() => setOpen(false)}
      className="border-select"
      dropdownClassName="border-select-dropdown"
    >
      {fieldSchema.enum.map((item: any, i) => (
        <AntdSelect.Option key={i} value={item.value} className="border-option">
          <div className="border-option-item">
            <div
              style={{
                height: 80,
                borderStyle: 'solid',
                borderWidth: 1,
                borderImage: `url(${item.src}) ${item.border.slice} / ${item.border.width} / ${item.border.outset} ${item.border.repeat}`,
              }}
            />
            {/* <div>&nbsp;{item.label}</div> */}
          </div>
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
};
