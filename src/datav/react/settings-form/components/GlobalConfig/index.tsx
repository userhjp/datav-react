import React, { useMemo, useRef } from 'react';
import { FormDrawer, FormItem, FormLayout, Input, Checkbox, Select, ArrayCollapse } from '@formily/antd';
import { Button, Collapse } from 'antd';
import { ArrayField, Field, ObjectField, VoidField } from '@formily/react';
import { InputProps } from 'rc-input';
import { MonacoEditor } from '../MonacoEditor';
import { ApiRequestMethod } from '@/datav/shared';
import { EditorPopover } from '../../DataFields/DataConfig';
import { useDataSource } from '@/datav/react/hooks';
import { DataCollapsePanel } from './DataCollapsePanel';

import './index.less';

type GlobalConfigProps = {
  title?: string;
  style?: React.CSSProperties;
  value: any;
};

export const GlobalConfig: React.FC<GlobalConfigProps & InputProps> = ({ style, title, onChange, value }) => {
  const configForm = useRef<any>();
  const dataSource = useDataSource();

  const openSourceDrawer = () => {
    FormDrawer(
      {
        title: '全局配置',
        bodyStyle: { background: '#1d2126', padding: '0 20px', fontSize: 12 },
        headerStyle: { background: '#1d2126' },
        footerStyle: { background: '#1d2126', borderTop: 'none' },
        style: { position: 'fixed', marginTop: 40, height: 'calc(100% - 40px)' },
        width: 500,
        className: 'global-config-drawer data-settings-drawer',
        getContainer: false,
        onClose: () => {
          onChange(configForm.current);
        },
      },
      (form) => {
        configForm.current = form.values;
        return (
          <FormLayout layout="vertical" colon={false} className="global-config-layout" size="small">
            <div className="step-title">全局数据源</div>
            <div className="data-sc-container">
              <ArrayField name="array">
                {(field) => {
                  return (
                    <Collapse expandIconPosition="right" defaultActiveKey={[]} ghost>
                      {field.value?.map((item, index) => (
                        <ObjectField key={index} name={index}>
                          {DataCollapsePanel({ ikey: `${index}` })}
                        </ObjectField>
                      ))}
                    </Collapse>
                  );
                }}
              </ArrayField>
            </div>
            <div className="step-title">
              <label style={{ cursor: 'pointer' }}>
                <Field name="useFilter" component={[Checkbox]} />
                <span className="update-txt">&nbsp;全局数据过滤器</span>
              </label>
            </div>
            <div className="filter-edit" style={{ height: form.values.useFilter ? 180 : 0 }}>
              <Field
                name="filterCode"
                reactions={(field) => {
                  const autoUpdate = field.query('.useFilter');
                  field.setComponentProps({
                    disabled: !autoUpdate.get('value'),
                  });
                }}
                component={[
                  MonacoEditor,
                  {
                    language: 'typescript',
                    readOnly: false,
                    autoFormat: true,
                    height: 120,
                    fullScreenTitle: '数据过滤器',
                    className: 'filter-editor',
                    fnName: 'filter(res)',
                  },
                ]}
              />
            </div>
          </FormLayout>
        );
      }
    ).open({
      initialValues: {
        array: [
          {
            title: '新建数据源',
            enable: false,
            apiUrl: '1111',
          },
        ],
      },
    });
  };

  return (
    <Button size="small" style={{ lineHeight: 1, width: '100%' }} className="ds-action-btn" onClick={openSourceDrawer}>
      全局配置
    </Button>
  );
};
