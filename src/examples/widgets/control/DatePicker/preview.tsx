import React, { useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import { DatePicker as AntDatePicker } from 'antd';
import { useDebounceFn } from 'ahooks';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './styles.less';

const DatePicker: React.FC<IWidgetProps> = ({ options, events }) => {
  const [value, setValue] = useState<string>('');
  const updateVariables = useDatavEvent(events.changed, null, false);

  const { run } = useDebounceFn(
    () => {
      updateVariables({ dateStr: value });
    },
    {
      wait: 500,
    }
  );

  return (
    <div className="widgets-date-picker">
      <AntDatePicker
        showToday={false}
        locale={locale}
        popupClassName="widgets-date-picker-dropdown"
        style={{ ...options.style, width: '100%' }}
        {...options.config}
        onChange={(e, dateString) => {
          setValue(dateString);
          run();
        }}
      />
    </div>
  );
};

export default DatePicker;
