import React from 'react';
import './index.less';

type FormTitleProps = {
  label: string;
};

export const FormTitle: React.FC<FormTitleProps> = (props) => {
  const { label, children } = props;
  return (
    <div className="m-form-title">
      <div className="m-form-title-tit">{label}</div>
      <div className="m-form-title-form scoll-prettify">{children}</div>
    </div>
  );
};