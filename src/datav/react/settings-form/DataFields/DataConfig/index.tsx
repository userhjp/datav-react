import React, { useMemo, useRef, useState } from 'react';
import { ApiRequestMethod, ApiType } from '../../../../shared';
import { IDataSourceSetting, IFieldSetting } from '../../../interface';
import { Checkbox, FormDrawer, FormItem, FormLayout, Select } from '@formily/antd';
import { Field, VoidField } from '@formily/react';
import { Button, Input, Tooltip } from 'antd';
import { MonacoEditor } from '../../components';
import { FieldGrid } from '../FieldGrid';
import { useDataSource } from '../../../hooks';
import { DataSource } from '../../../../core';
import { IconWidget } from '../../../components';
import './index.less';

type DataConfigProps = {
  fields: IFieldSetting;
  onChange: (value: IDataSourceSetting) => void;
  value: IDataSourceSetting;
  editorType: 'json' | 'plaintext';
};

const DataConfig: React.FC<DataConfigProps> = (props) => {
  const { onChange, value, editorType, fields } = props;
  const configForm = useRef<IDataSourceSetting>();
  const dataSource = useDataSource();
  const apiMethods = useMemo(() => {
    return Object.entries(ApiRequestMethod).map(([key, val]) => {
      return { label: key, value: val };
    });
  }, []);

  const apiTypes = useMemo(
    () => [
      {
        label: '静态数据',
        value: ApiType.static,
      },
      {
        label: 'API',
        value: ApiType.api,
      },
    ],
    []
  );

  const openSourceDrawer = () => {
    FormDrawer(
      {
        title: '设置数据源',
        bodyStyle: { background: '#1d2126', padding: '0 20px', fontSize: 12 },
        headerStyle: { background: '#1d2126' },
        footerStyle: { background: '#1d2126', borderTop: 'none' },
        style: { position: 'fixed', marginTop: 40, height: 'calc(100% - 40px)' },
        width: 500,
        className: 'data-settings-drawer',
        onClose: () => {
          onChange && onChange(configForm.current);
        },
      },
      (form) => {
        configForm.current = form.values;
        return (
          <FormLayout layout="vertical" colon={false} className="config-layout" size="small">
            <div className="step-title">数据源</div>
            <Field
              name="apiType"
              title="数据源类型"
              dataSource={apiTypes}
              decorator={[FormItem, { style: { marginBottom: 12 } }]}
              component={[
                Select,
                { placeholder: '请选择数据类型', defaultValue: 1, dropdownClassName: 'datav-dropdown', className: 'apitype-selectd' },
              ]}
            />
            <Field
              name="data"
              reactions={(field) => {
                const apiType = field.query('.apiType').get('value');
                field.setState({
                  display: apiType === ApiType.static ? 'visible' : 'hidden',
                });
              }}
              component={[
                MonacoEditor,
                { language: editorType, readOnly: false, autoFormat: true, height: 250, fullScreenTitle: '数据响应结果' },
              ]}
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
            </VoidField>
            <EditorPopover dataSource={dataSource} config={form.values} />
            <div className="step-title">
              <label style={{ cursor: 'pointer' }}>
                <Field name="useFilter" component={[Checkbox]} />
                <span className="update-txt">&nbsp;数据过滤器</span>
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
                    language: 'javascript',
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
            <FieldGrid typeName={value.dataType === 'object' ? '对象' : '列表'} fields={fields} />
          </FormLayout>
        );
      }
    ).open({
      initialValues: value,
    });
  };
  return (
    <Button size="small" className="ds-action-btn" onClick={openSourceDrawer}>
      配置数据源
    </Button>
  );
};
export default DataConfig;

export const EditorPopover: React.FC<{ dataSource: DataSource; config: IDataSourceSetting }> = ({ config, dataSource }) => {
  const [viewData, setViewData] = useState();

  const loadData = async (visible: boolean) => {
    let resData: any;
    if (visible) {
      try {
        resData = await dataSource.requestData(config);
      } catch (error) {
        resData = { isError: true, message: `${error}` };
      }
      setViewData(resData);
    }
  };

  return (
    <Tooltip
      placement="left"
      trigger="click"
      onVisibleChange={loadData}
      overlayClassName="editor-popover"
      title={() => {
        return (
          <MonacoEditor
            {...{
              language: 'json',
              value: viewData,
              readOnly: true,
              autoFormat: true,
              height: 180,
              fullScreenTitle: '数据响应结果',
              className: 'filter-editor',
            }}
          />
        );
      }}
    >
      <div className="ds-response-btn">
        <IconWidget infer="Search" />
        &nbsp;预览数据源返回结果
      </div>
    </Tooltip>
  );
};
