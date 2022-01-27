import React from 'react';
import { connect, mapReadPretty, mapProps } from '@formily/react';
import { Select as AntdSelect } from 'antd';
import { PreviewText } from '@formily/antd';
import { IconWidget } from '@/datav/react/components';
import './index.less';
export const Select = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        className: 'datav-selectd',
        dropdownClassName: 'datav-dropdown', // 方便重置样式
        suffixIcon: field?.['loading'] || field?.['validating'] ? <IconWidget infer="Loading" /> : props.suffixIcon,
      };
    }
  ),
  mapReadPretty(PreviewText.Select)
);
