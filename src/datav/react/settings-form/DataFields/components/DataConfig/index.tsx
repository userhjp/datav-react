import React, { useRef } from 'react';
import { IDataSourceSetting, IFieldSetting } from '../../../../interface';
import { Checkbox, FormDrawer, FormLayout } from '@formily/antd';
import { Field, VoidField } from '@formily/react';
import { Button } from 'antd';
import { MonacoEditor } from '../../../components';
import { FieldGrid } from '../FieldGrid';
import { DataSource } from '../DataSource';
import { DataPreview } from '../DataPreview';
import { useDataSource, useDvGlobal } from '@/datav/react/hooks';
import './index.less';

type DataConfigProps = {
  fields: IFieldSetting;
  onChange: (value: IDataSourceSetting) => void;
  value: IDataSourceSetting;
  editorType: 'json' | 'plaintext';
};

export const DataConfig: React.FC<DataConfigProps> = (props) => {
  const { onChange, value, editorType, fields } = props;
  const configForm = useRef<IDataSourceSetting>();
  const dataSource = useDataSource();
  const dvGlobal = useDvGlobal();

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
        getContainer: false,
        onClose: () => onChange(configForm.current),
      },
      (form) => {
        configForm.current = form.values;
        return (
          <FormLayout layout="vertical" colon={false} className="config-layout" size="small">
            <div className="step-title">数据源</div>
            <VoidField name="voidDataField" component={[DataSource, { globalDataOptions: dvGlobal.enableDataSources }]} />
            <DataPreview config={form.values} dataSource={dataSource} />
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
                    language: 'typescript',
                    readOnly: false,
                    autoFormat: true,
                    height: 180,
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
