import React, { useMemo, useRef } from 'react';
import { FormDrawer, FormItem, FormLayout, Input, Checkbox, Select } from '@formily/antd';
import { Button } from 'antd';
import { Field, ObjectField, VoidField } from '@formily/react';
import { InputProps } from 'rc-input';
import { MonacoEditor } from '../MonacoEditor';
import { ApiRequestMethod } from '@/datav/shared';
import { EditorPopover } from '../../DataFields/DataConfig';
import { useDataSource } from '@/datav/react/hooks';

import './index.less';

type GlobalConfigProps = {
  title?: string;
  style?: React.CSSProperties;
  value: any;
};

export const GlobalConfig: React.FC<GlobalConfigProps & InputProps> = ({ style, title, onChange, value }) => {
  const configForm = useRef<any>();
  const dataSource = useDataSource();

  const apiMethods = useMemo(() => {
    return Object.entries(ApiRequestMethod).map(([key, val]) => {
      return { label: key, value: val };
    });
  }, []);

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
            <ObjectField name="apiConfig">
              <Field
                name="apiMethod"
                title="请求方式"
                initialValue={ApiRequestMethod.GET}
                dataSource={apiMethods}
                decorator={[FormItem, { style: { marginBottom: 12 } }]}
                component={[Select, { placeholder: '请选择请求方式', dropdownClassName: 'datav-dropdown' }]}
              />
              <p className="url-info">
                <label className="prefix-label textarea-label">URL：</label>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                  className="api-help"
                >
                  重要：跨域问题解决方案
                </a>
              </p>
              <p className="url-info-text">将回调参数配置到url中, 例: http://api.test?value=:value</p>
              <Field
                name="apiUrl"
                component={[Input.TextArea, { size: 'small', placeholder: '请求url地址', rows: 4, style: { backgroundColor: '#0e1013' } }]}
              />
              <Field
                name="apiHeaders"
                title="Headers (Optional)"
                initialValue={'{}'}
                decorator={[FormItem, { style: { marginBottom: 12, marginTop: 12 }, labelWidth: 200 }]}
                component={[
                  MonacoEditor,
                  {
                    language: 'json',
                    readOnly: false,
                    autoFormat: true,
                    height: 110,
                    fullScreenTitle: 'Headers (Optional)',
                    className: 'filter-editor',
                  },
                ]}
              />
              <Field
                name="apiBody"
                title="POST请求参数"
                initialValue={'{}'}
                decorator={[FormItem, { style: { marginBottom: 12, marginTop: 12 } }]}
                reactions={(field) => {
                  const apiMethod = field.query('.apiMethod').get('value');
                  field.setState({
                    display: apiMethod === ApiRequestMethod.POST ? 'visible' : 'none',
                  });
                }}
                component={[
                  MonacoEditor,
                  {
                    language: 'json',
                    readOnly: false,
                    autoFormat: true,
                    height: 110,
                    fullScreenTitle: 'POST请求参数',
                    className: 'filter-editor',
                  },
                ]}
              />
            </ObjectField>
            <EditorPopover dataSource={dataSource} config={form.values} />
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
      initialValues: value,
    });
  };

  return (
    <Button size="small" style={{ lineHeight: 1, width: '100%' }} className="ds-action-btn" onClick={openSourceDrawer}>
      全局配置
    </Button>
  );
};
