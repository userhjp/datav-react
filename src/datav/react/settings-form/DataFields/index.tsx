import React from 'react';
import { ObjectField as ObjectFieldType } from '@formily/core';
import { Field, FormConsumer, ObjectField, observer, useField, useForm } from '@formily/react';
import { Checkbox } from '@formily/antd';
import DataState from './DataState';
import { MonacoEditor, BlurInput } from '../components';
import { useEffect, useMemo, useState } from 'react';
import { DataSource } from '@/datav/interface';
import { languageType } from '../components/MonacoEditor/editor-config';
import { InputNumber, Tooltip } from 'antd';
import { autorun } from '@formily/reactive';
import { ApiType, FieldStatus } from '@/datav/shared';
import DataConfig from './DataConfig';
import { useDataSource } from '@/datav/react/hooks';
import { IconWidget } from '../../components';
import './index.less';

const DataFields: React.FC = () => {
  const field = useField<ObjectFieldType<DataSource>>();
  const value = useMemo(() => field.value || {}, [field.value]);
  const editorType: languageType = useMemo<'json' | 'plaintext'>(() => {
    return {
      array: 'json',
      object: 'json',
      string: 'plaintext',
    }[value?.config?.dataType || 'string'];
  }, [value?.config?.dataType]);

  const refreshData = () => {
    value.config = { ...(value.config || {}) };
  };

  return (
    <>
      <ObjectField name="fields">
        <div className="data-attr-table-container">
          <table className="data-attr-table">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="th-item column-item attr-name">字段</th>
                <th className="th-item column-item attr-value">映射</th>
                <th className="th-item column-item attr-status">状态</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {Object.keys(value?.fields || {}).map((key) => (
                <ObjectField name={key} key={key}>
                  <tr className="table-body-row">
                    <td className="column-item attr-name">
                      <Tooltip
                        overlayClassName="design-tip"
                        color="#2681ff"
                        placement="left"
                        title={value?.fields[key].description || null}
                      >
                        <span style={{ cursor: 'help' }}>{key}</span>
                      </Tooltip>
                    </td>
                    <td className="column-item attr-value">
                      <Field name="map" component={[BlurInput, { size: 'small', placeholder: '可自定义' }]} />
                    </td>
                    <td className="column-item attr-status">
                      <Field name="status" component={[DataState]} />
                    </td>
                  </tr>
                </ObjectField>
              ))}
            </tbody>
          </table>
        </div>
      </ObjectField>
      <div className="data-result-title">数据响应结果</div>
      <div className="data-auto-update">
        <label style={{ cursor: 'pointer' }}>
          <Field name="autoUpdate" initialValue={false} component={[Checkbox]} />
          <span className="update-txt">自动更新数据</span>
        </label>
        <Field
          name="updateTime"
          initialValue={1}
          reactions={(field) => {
            const autoUpdate = field.query('.autoUpdate');
            field.setComponentProps({
              disabled: !autoUpdate.get('value'),
            });
          }}
          component={[InputNumber, { max: 9999, min: 1, defaultValue: 1 }]}
        />
        <span>秒一次</span>
      </div>
      <div className="data-flow-wp">
        <div className="ds-line">
          <div className="ds-title">
            <FormConsumer>
              {() => <span className="ds-type-text">{value.config?.apiType === ApiType.api ? 'API' : '静态数据'}</span>}
            </FormConsumer>
          </div>
          {/* 数据配置 */}
          <ObjectField name="config" component={[DataConfig, { editorType, fields: value?.fields }]} />
        </div>
        <div className="ds-line mt2">
          <span>数据响应结果 ( 只读 ) </span>
          <Tooltip overlayClassName="design-tip" color="#2681ff" placement="left" title={'刷新数据'}>
            <IconWidget onClick={refreshData} className="refresh-btn" infer="Recover" />
          </Tooltip>
        </div>
        <div className="ds-dots">
          <DataTotalState field={value?.fields} />
          <span className="ds-dot" />
          <span className="ds-dot" />
        </div>
      </div>
      <ReadOnlyEditor editorType={editorType} />
    </>
  );
};

export default DataFields;

const DataTotalState = ({ field }) => {
  const [totalStatus, setTotalStatus] = useState(false);
  useEffect(() => {
    const dispose = autorun(() => {
      const isError = field ? Object.keys(field).every((e) => field[e].status === FieldStatus.failed) : false;
      setTotalStatus(isError);
    });
    return () => dispose();
  }, []);
  return <span className={`ds-dot ${totalStatus ? 'error' : 'active'}`} />;
};

const ReadOnlyEditor: React.FC<{ editorType: languageType }> = observer(({ editorType }) => {
  const dataSource = useDataSource();
  const form = useForm();
  const id = form.getValuesIn('id');
  const editorData = dataSource.getData(id);
  return (
    <MonacoEditor
      {...{
        language: editorType,
        readOnly: true,
        autoFormat: true,
        height: 250,
        fullScreenTitle: '数据响应结果',
        value: editorData || '',
      }}
    />
  );
});
