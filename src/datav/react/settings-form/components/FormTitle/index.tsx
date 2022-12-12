import { observer } from '@formily/react';
import React from 'react';
import './index.less';

type FormTitleProps = {
  label: string;
  children: React.ReactNode;
};

export const FormTitle: React.FC<FormTitleProps> = observer((props) => {
  const { label, children } = props;
  return (
    <div className="m-form-title">
      <div className="m-form-title-tit">{label}</div>
      <div className="m-form-title-form scoll-prettify">{children}</div>
    </div>
  );
});
