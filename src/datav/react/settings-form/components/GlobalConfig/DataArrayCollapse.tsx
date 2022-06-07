import { Field, ObjectField, observer, useField } from '@formily/react';
import { ArrayField as ArrayFieldType } from '@formily/core';
import { Collapse, InputProps, Button, Popconfirm, InputNumber } from 'antd';
import React, { useContext, useRef } from 'react';
import { Checkbox, Input } from '@formily/antd';
import { IconWidget } from '@/datav/react/components';
import { DataSource as DataSourceType } from '@/datav/core';
import { DataPreview, DataSource } from '../../DataFields/components';
import { DrawerContext } from './context';
import { generateUUID } from '@/datav/shared';
import './index.less';

export const DataArrayCollapse: React.FC<InputProps & { dataSource: DataSourceType }> = observer(() => {
  const field = useField<ArrayFieldType>();
  const { dataSource } = useContext(DrawerContext);
  const domRef = useRef<HTMLDivElement>();
  return (
    <div ref={domRef} className="dv-data-array-collapse">
      <Collapse expandIconPosition="right" defaultActiveKey={[]} ghost>
        {field.value?.map((item, index) => {
          return (
            <Collapse.Panel
              forceRender
              className="global-config-source"
              header={<CollapseHeader name={index} domRef={domRef} />}
              key={index}
            >
              <ObjectField name={index}>
                {item.config.apiType === 'api' && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 44,
                      zIndex: 9999,
                      transform: 'translateY(-5px)',
                    }}
                  >
                    <label style={{ cursor: 'pointer' }}>
                      <Field name="autoUpdate" initialValue={false} component={[Checkbox]} />
                      <span className="update-txt"> 定时刷新 </span>
                    </label>
                    <Field
                      name="updateTime"
                      initialValue={3}
                      reactions={(field) => {
                        field.setComponentProps({
                          disabled: !item.autoUpdate,
                        });
                      }}
                      component={[InputNumber, { max: 9999, min: 1, defaultValue: 3, width: 100 }]}
                    />
                    <span> 秒一次</span>
                  </div>
                )}
                <ObjectField name="config" component={[DataSource]} />
                <DataPreview config={item.config} dataSource={dataSource} />
              </ObjectField>
            </Collapse.Panel>
          );
        })}
      </Collapse>
      <div style={{ padding: '0 10px 10px 10px' }}>
        <Button
          block
          size="small"
          className="ds-action-btn"
          onClick={() => {
            const uuid = generateUUID();
            field.push({
              id: uuid,
              title: '新建数据源',
              enable: false,
              config: {
                apiUrl: '',
              },
            });
          }}
        >
          <IconWidget infer="Add" />
          &nbsp; 添加数据源
        </Button>
      </div>
    </div>
  );
});

const CollapseHeader: React.FC<{ name: number; domRef: React.MutableRefObject<HTMLDivElement> }> = (props) => {
  const field = useField<ArrayFieldType>();
  return (
    <ObjectField name={props.name}>
      <div className="global-config-header" onClick={(e) => e.stopPropagation()}>
        <Field name="enable" component={[Checkbox]} />
        <Field
          name="title"
          component={[
            HeaderTitle,
            {
              placeholder: '请输入',
              size: 'small',
              onBlur: () => {
                field.form.setFieldState(`sourceArray.${props.name}.title`, {
                  readPretty: true,
                });
              },
            },
          ]}
          readPretty
        />
        <IconWidget
          className="focus-show"
          style={{ paddingLeft: 10 }}
          infer="Edit"
          onClick={() => {
            console.log(`sourceArray.${props.name}.title`, field.form.getValuesIn(`sourceArray.${props.name}.title`));
            field.form.setFieldState(`sourceArray.${props.name}.title`, {
              readPretty: false,
            });
          }}
        />
        <div className="fill-up" />
        <Popconfirm
          className="focus-show"
          placement="leftBottom"
          title="确认删除该数据源？"
          getPopupContainer={() => props.domRef.current}
          onConfirm={() => {
            field.remove(props.name);
          }}
          okText="确认"
          cancelText="取消"
        >
          <IconWidget style={{ position: 'absolute', right: 30 }} infer="Close" />
        </Popconfirm>
      </div>
    </ObjectField>
  );
};

const HeaderTitle: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};
