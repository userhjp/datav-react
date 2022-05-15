import { IconWidget } from '@/datav/react/components';
import { useDvGlobal } from '@/datav/react/hooks';
import { observer, useField } from '@formily/react';
import { Select as AntdSelect, Collapse } from 'antd';
import React, { useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import './index.less';

export const Palette: React.FC<any> = observer((props) => {
  const dvGlobal = useDvGlobal();
  const [open, setOpen] = useState(false);

  const colors = dvGlobal.colorList.map((m: any) => m.join());
  const val = props.value.join();
  const field = useField();
  if (!colors.some((s) => s === val)) {
    colors.push(val);
  }

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '250px' }} onClick={(e) => e.stopPropagation()}>
        <span style={{ paddingRight: 20 }}>{field.title}</span>
        <AntdSelect
          style={{ minWidth: 0, flex: 1 }}
          virtual={false}
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
          onBlur={() => setOpen(false)}
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
      </div>
    );
  };

  return (
    <div className="palette-select-dropdown-menu">
      <Collapse className="palette-collapse" expandIconPosition="right" defaultActiveKey={['1']} ghost>
        <Collapse.Panel header={renderHeader()} key="1">
          <div style={{ backgroundColor: '#262C33', border: '1px solid #0B0C0D' }}>
            <ColorPicker value="" onChange={() => {}} />
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});
