import React, { useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import { Input as AntdInput, Button } from 'antd';
import { IconWidget } from '@/datav/react/components';
import './styles.less';
import { useDebounce, useDebounceFn } from 'ahooks';

const Input: React.FC<IWidgetProps> = ({ options, events }) => {
  const [value, setValue] = useState<string>('');
  const updateVariables = useDatavEvent(events.changed, null, false);

  const { run } = useDebounceFn(
    () => {
      updateVariables({ value });
    },
    {
      wait: 500,
    }
  );

  return (
    <div className="widgets-input">
      <AntdInput.Group compact className="widgets-input-group">
        <AntdInput
          style={options.style}
          {...options.config}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (options.btnWidth <= 0) {
              run();
            }
          }}
        />
        {options.btnWidth > 0 && (
          <Button
            style={{
              backgroundColor: options.btnColor,
              borderColor: options.btnColor,
              width: options.btnWidth,
              minWidth: options.btnWidth,
            }}
            size={options.config.size}
            type="primary"
            onClick={() => updateVariables({ value })}
          >
            <IconWidget infer="Search" />
          </Button>
        )}
      </AntdInput.Group>
    </div>
  );
};

export default Input;
