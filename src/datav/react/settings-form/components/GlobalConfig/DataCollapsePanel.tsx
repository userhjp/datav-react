import { ApiRequestMethod } from '@/datav/shared';
import { Checkbox, FormItem } from '@formily/antd';
import { Field, ObjectField, useFieldSchema } from '@formily/react';
import { Select as AntdSelect, Collapse, CollapsePanelProps, InputProps, Select, Input } from 'antd';
import React, { useMemo } from 'react';
import { MonacoEditor } from '../MonacoEditor';
import './index.less';

export const DataCollapsePanel: React.FC<InputProps & { ikey: string }> = ({ ikey }) => {
  const apiMethods = useMemo(() => {
    return Object.entries(ApiRequestMethod).map(([key, val]) => {
      return { label: key, value: val };
    });
  }, []);
  const renderHeader = () => {
    return (
      <div className="global-config-header">
        <Field name="enable" component={[Checkbox]} />
        {/* <span className="update-txt">自动更新数据</span> */}
        <Field name="title" component={[Input, { placeholder: '请输入', size: 'small' }]} />
      </div>
    );
  };

  return (
    <Collapse.Panel className="global-config-source" header={renderHeader()} key={ikey}>
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
        <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" className="api-help">
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
      {/* <EditorPopover dataSource={dataSource} config={form.values} /> */}
    </Collapse.Panel>
  );
};
