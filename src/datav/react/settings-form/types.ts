import React from 'react';
import { Form } from '@formily/core';
export interface ISettingFormProps {
  className?: string;
  style?: React.CSSProperties;
  components?: Record<string, React.FC<any>>;
  effects?: (form: Form) => void;
  scope?: any;
}
