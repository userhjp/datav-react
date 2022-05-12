import { useFieldSchema } from '@formily/react';
import { Select as AntdSelect } from 'antd';
import React, { useState } from 'react';
import './index.less';

export const DecorateSelect: React.FC = (props) => {
  const fieldSchema = useFieldSchema();
  const [open, setOpen] = useState(false);

  return (
    <AntdSelect
      onDropdownVisibleChange={(e) => {
        if (e) setOpen(true);
      }}
      {...props}
      open={open}
      onBlur={() => setOpen(false)}
      className="decorate-select"
      dropdownClassName="decorate-select-dropdown"
    >
      {fieldSchema.enum.map((item: any, i) => (
        <AntdSelect.Option key={i} value={item.value} className="decorate-option">
          <div className="decorate-option-item">
            <div
              style={{
                width: '100%',
                height: 22,
                backgroundImage: `url(${item.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
};
