import { ApiRequestMethod, ApiType } from '../../../../../shared';
import React, { useMemo } from 'react';
import { Field, observer, VoidField } from '@formily/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { MonacoEditor } from '../../../components';
import { FormItem, Select } from '@formily/antd';
import './index.less';

const apiTypes = [
  {
    label: '静态数据',
    value: ApiType.static,
  },
  {
    label: 'API',
    value: ApiType.api,
  },
];

export const DataSource: React.FC<{ globalDataOptions?: any[]; variables: Record<string, string> }> = observer(
  ({ globalDataOptions, variables = [] }) => {
    const apiMethods = useMemo(() => {
      return Object.entries(ApiRequestMethod).map(([key, val]) => {
        return { label: key, value: val };
      });
    }, []);

    const CompletionItem = Object.entries(variables).map(([key, val]) => {
      return {
        label: key,
        detail: 'DataV全局变量',
        insertText: key, // 选择后插入代码
        kind: monaco.languages.CompletionItemKind.Field,
        range: null,
      };
    });

    return (
      <div className="dv-req-data-setting">
        <Field
          name="apiType"
          title="数据源类型"
          dataSource={[...(globalDataOptions ? [{ label: '全局数据', value: ApiType.global }] : []), ...apiTypes]}
          initialValue={ApiType.api}
          decorator={[FormItem, { style: { marginBottom: 12 } }]}
          component={[Select, { placeholder: '请选择数据类型', dropdownClassName: 'datav-dropdown', className: 'apitype-selectd' }]}
        />
        <Field
          name="globalDataId"
          title="全局数据源"
          dataSource={globalDataOptions}
          decorator={[FormItem, { style: { marginBottom: 12 } }]}
          component={[Select, { placeholder: '请选择数据源', dropdownClassName: 'datav-dropdown', className: 'apitype-selectd' }]}
          reactions={(field) => {
            const apiType = field.query('.apiType').get('value');
            field.setState({
              display: apiType === ApiType.global ? 'visible' : 'hidden',
            });
          }}
        />
        <Field
          name="data"
          reactions={(field) => {
            const apiType = field.query('.apiType').get('value');
            field.setState({
              display: apiType === ApiType.static ? 'visible' : 'hidden',
            });
          }}
          component={[MonacoEditor, { language: 'json', readOnly: false, autoFormat: true, height: 250, fullScreenTitle: '数据响应结果' }]}
        />
        <VoidField
          name="apiConfig"
          reactions={(field) => {
            const apiType = field.query('.apiType').get('value');
            field.setState({
              display: apiType === ApiType.api ? 'visible' : 'none',
            });
          }}
        >
          <Field
            name="apiMethod"
            title="请求方式"
            initialValue={ApiRequestMethod.GET}
            dataSource={apiMethods}
            decorator={[FormItem, { style: { marginBottom: 12 } }]}
            component={[Select, { placeholder: '请选择请求方式', dropdownClassName: 'datav-dropdown', className: 'apitype-selectd' }]}
          />
          <p className="url-info">
            <label className="prefix-label">URL：</label>
            <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" className="api-help">
              重要：跨域问题解决方案
            </a>
          </p>
          <p className="url-info-text">将回调参数配置到url中, 例: http://api.test?value=:value</p>
          {/* <Field
          name="apiUrl"
          component={[Input.TextArea, { size: 'small', placeholder: '请求url地址', rows: 4, style: { backgroundColor: '#0e1013' } }]}
        /> */}
          <Field
            name="apiUrl"
            initialValue={'http://'}
            component={[
              MonacoEditor,
              {
                completionItem: CompletionItem,
                language: 'plaintext',
                readOnly: false,
                height: 80,
                fullScreenTitle: 'URL地址',
                className: 'filter-editor',
              },
            ]}
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
        </VoidField>
      </div>
    );
  }
);
