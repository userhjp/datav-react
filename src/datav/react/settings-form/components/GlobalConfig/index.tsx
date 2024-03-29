import React, { useRef } from 'react';
import { FormDrawer, FormLayout } from '@formily/antd';
import { Button, Tooltip } from 'antd';
import { ArrayField, observer } from '@formily/react';
import { InputProps } from 'rc-input';
import { DataArrayCollapse } from './DataArrayCollapse';
import { useDataSource, useDvGlobal, useVariables } from '@/datav/react/hooks';
import { DrawerContext } from './context';
import { GlobalColors } from './GlobalColors';
import { IconWidget } from '@/datav/react/components';
import './index.less';

type GlobalConfigProps = {
  title?: string;
  style?: React.CSSProperties;
  value: any;
};
export const GlobalConfig: React.FC<GlobalConfigProps & InputProps> = observer(() => {
  const configForm = useRef<any>();
  const dataSource = useDataSource();
  const dvGlobal = useDvGlobal();
  const { variables } = useVariables();
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
        onClose: () => dvGlobal.setInitialValue(configForm.current),
      },
      (form) => {
        configForm.current = form.values;
        return (
          <FormLayout layout="vertical" colon={false} className="global-config-layout" size="small">
            <div className="step-title">
              全局数据源 &nbsp;
              <Tooltip
                overlayClassName="design-tip"
                color="#2681ff"
                placement="bottom"
                title={'当多个组件共享同一接口数据，可配置全局数据共享，避免同一数据源多次创建或请求'}
              >
                <IconWidget infer="Help" style={{ cursor: 'help' }} />
              </Tooltip>
            </div>
            <div className="data-source-container">
              <DrawerContext.Provider value={{ dataSource, variables }}>
                <ArrayField name="sourceArray" component={[DataArrayCollapse]} />
              </DrawerContext.Provider>
            </div>
            {/* <div className="step-title">全局请求Headers (Optional)</div> */}
            <div className="step-title">颜色模板配置</div>
            <div style={{ paddingRight: 8 }}>
              <ArrayField name="colors" component={[GlobalColors]} />
            </div>
            {/* <div className="step-title">
              <label style={{ cursor: 'pointer' }}>
                <Field name="useFilter" component={[Checkbox]} />
                <span className="update-txt">&nbsp;全局数据过滤器</span>
              </label>
            </div>
            <div className="filter-edit" style={{ maxHeight: 180, height: form.values.useFilter ? 180 : 0 }}>
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
                    height: 180,
                    fullScreenTitle: '数据过滤器',
                    className: 'filter-editor',
                    fnName: 'filter(res)',
                  },
                ]}
              />
            </div> */}
          </FormLayout>
        );
      }
    ).open({
      initialValues: {
        sourceArray: dvGlobal.sourceArray,
        colors: dvGlobal.colors,
        filterCode: 'return res.data',
      },
    });
  };

  return (
    <Button size="small" style={{ lineHeight: 1, width: '100%' }} className="ds-action-btn" onClick={openSourceDrawer}>
      全局配置
    </Button>
  );
});
