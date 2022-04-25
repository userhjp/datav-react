import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import { Select as AntdSelect } from 'antd';
import './styles.less';

const Select: React.FC<IWidgetProps> = ({ options, events, data = [] }) => {
  const [selectd, setSelectd] = useState<any>();
  const { defaultSelectd, multiple, ...config } = options.config;
  const evData = useMemo(() => {
    return data?.find((f) => f.value === selectd) || {};
  }, [selectd]);
  useDatavEvent(events.changed, evData);

  useEffect(() => {
    if (!selectd && data?.length && defaultSelectd) {
      setSelectd(data[0].value);
    } else {
      setSelectd(null);
    }
  }, [data, defaultSelectd]);

  const selectStyle: React.CSSProperties = {
    width: '100%',
    ...(options.style || {}),
  };

  const dropdownStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    zIndex: 9999999,
  };

  return (
    <div className="widgets-select">
      <AntdSelect
        {...(config || {})}
        multiple
        mode={multiple ? 'multiple' : false}
        options={data || []}
        value={selectd}
        showSearch
        allowClear
        onChange={setSelectd}
        style={selectStyle}
        dropdownStyle={dropdownStyle}
        dropdownClassName="widgets-select-dropdown"
      >
        {/* {data?.map((m, i) => (
          <AntdSelect.Option key={i} value={m.value}>
            {m.label}
          </AntdSelect.Option>
        ))} */}
      </AntdSelect>
    </div>
  );
};

export default Select;
