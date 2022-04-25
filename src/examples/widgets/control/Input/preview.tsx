import React, { useEffect, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import { Input as AntdInput, Button } from 'antd';
import { IconWidget } from '@/datav/react/components';
import './styles.less';

const Input: React.FC<IWidgetProps> = ({ options, events }) => {
  const [value, setValue] = useState<any>('');
  const updateVariables = useDatavEvent(events.changed, null, false);

  return (
    <div className="widgets-input">
      <AntdInput.Group compact className="widgets-input-group">
        <AntdInput style={options.style} {...options.config} value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          style={{ backgroundColor: options.style.btnColor, borderColor: options.style.btnColor }}
          size={options.config.size}
          type="primary"
          onClick={() => updateVariables({ value })}
        >
          <IconWidget infer="Search" />
        </Button>
      </AntdInput.Group>
    </div>
  );
};

export default Input;
