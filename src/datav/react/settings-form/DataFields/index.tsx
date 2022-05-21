import React from 'react';
import { ObjectField as ObjectFieldType } from '@formily/core';
import { Field, FormConsumer, ObjectField, observer, useField, useForm } from '@formily/react';
import { Checkbox } from '@formily/antd';
import { MonacoEditor, BlurInput, SettingsEmpty } from '../components';
import { useEffect, useMemo, useState } from 'react';
import { IDataSetting } from '../../interface';
import { languageType } from '../components/MonacoEditor/editor-config';
import { InputNumber, Tooltip } from 'antd';
import { autorun } from '@formily/reactive';
import { FieldStatus } from '../../../shared';
import { useDataSource, useSelected, useSelection } from '../../hooks';
import { DataConfig, DataState } from './components';
import { IconWidget } from '../../components';
import './index.less';

export const DataFields: React.FC = observer(() => {
  const field = useField<ObjectFieldType<IDataSetting>>();
  const dataSource = useDataSource();
  const selection = useSelection();
  const dvData = dataSource.getData(selection.first);
  const value = useMemo(() => field.value || {}, [field.value]);
  if (!value.config?.data) {
    return <SettingsEmpty title="该组件无需配置数据" />;
  }
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
      {Object.keys(value?.fields || {}).length > 0 && (
        <>
          <ObjectField name="fields">
            <div className="data-attr-table-container">
              <table className="data-field-table">
                <thead className="table-head">
                  <tr className="table-head-row">
                    <th className="th-item column-item attr-name">字段</th>
                    <th className="th-item column-item attr-value">映射</th>
                    <th className="th-item column-item attr-status">状态</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {Object.keys(value.fields).map((key) => (
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
                          <DataState status={dvData.fieldsStatus[key]} />
                        </td>
                      </tr>
                    </ObjectField>
                  ))}
                </tbody>
              </table>
            </div>
          </ObjectField>
          <div className="data-result-title">数据响应结果</div>
        </>
      )}
      <div className="data-auto-update">
        <label style={{ cursor: 'pointer' }}>
          <Field name="autoUpdate" initialValue={false} component={[Checkbox]} />
          <span className="update-txt">自动更新数据</span>
        </label>
        <Field
          name="updateTime"
          initialValue={3}
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
            <span className="ds-type-text">
              {
                {
                  global: '全局数据',
                  static: '静态数据',
                  api: 'API',
                }[value.config?.apiType]
              }
            </span>
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
});

const DataTotalState = ({ field }) => {
  const [totalStatus, setTotalStatus] = useState(false);
  useEffect(() => {
    const dispose = autorun(() => {
      const isError = field && Object.keys(field).length ? Object.keys(field).every((e) => field[e].status === FieldStatus.failed) : false;
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
  const editorData = dataSource.getData(id).data;
  return (
    <MonacoEditor
      {...{
        language: editorType,
        readOnly: true,
        autoFormat: true,
        height: 350,
        fullScreenTitle: '数据响应结果',
        value: (editorData as any) || '',
      }}
    />
  );
});
