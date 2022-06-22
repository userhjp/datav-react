import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import React, { useEffect, useState } from 'react';
import './index.less';

export const FunTextArea: React.FC<TextAreaProps & { funName: string }> = (props) => {
  const [value, setValue] = useState(props.value);
  const { funName, ...prop } = props;

  useEffect(() => {
    if (value !== props.value) setValue(props.value);
  }, [props.value]);

  return (
    <div className="fun-textarea">
      <p title="function filter(res) {" className="fake-code">
        <span className="--keyword">function</span> {`${funName} {`}
      </p>
      <Input.TextArea
        {...prop}
        autoSize={{ minRows: 2, maxRows: 4 }}
        autoComplete={'off'}
        value={value}
        spellCheck={false}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          props.onChange(e);
        }}
      />
      <p className="fake-code end">{'}'}</p>
    </div>
  );
};
