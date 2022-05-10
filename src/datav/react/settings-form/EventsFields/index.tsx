import React from 'react';
import { ObjectField as ObjectFieldType, ArrayField as ArrayFieldType } from '@formily/core';
import { ArrayField, Field, ObjectField, observer, useField } from '@formily/react';
import { toArr } from '@formily/shared';
import { Button, Checkbox, Collapse } from 'antd';
import { useMemo } from 'react';
import { IDataSetting, IEventField } from '../../interface';
import { Tooltip } from 'antd';
import { BlurInput, SettingsEmpty } from '../components';
import { IconWidget } from '../../components';
import { markRaw, model } from '@formily/reactive';
import './index.less';

const { Panel } = Collapse;
type ActiveKeys = string | number | Array<string | number>;

type ActiveKey = string | number;
export const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys;
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true;
        }
      } else if (formCollapse.activeKeys == key) {
        return true;
      }
      return false;
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return;
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key);
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter((item) => item != key);
      } else {
        formCollapse.activeKeys = '';
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key);
      } else {
        formCollapse.addActiveKey(key);
      }
    },
  });
  return markRaw(formCollapse);
};

export const EventFields: React.FC = observer(() => {
  const field = useField<ObjectFieldType<IDataSetting>>();
  const value = useMemo(() => field.value || {}, [field.value]);
  const _formCollapse = useMemo(() => {
    return createFormCollapse();
  }, []);

  if (Object.keys(value).length < 1) {
    return <SettingsEmpty title="该组件没有交互事件" />;
  }

  const renderExtra = (obj: any, key: string) => {
    return (
      <Checkbox
        checked={obj.enable}
        style={{ color: '#bcc9d4', fontSize: '12px' }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          obj.enable = e.target.checked;
          if (!obj.enable) {
            _formCollapse?.removeActiveKey(key);
          }
          // field.form.setFieldState(`events.${key}.fields`, (state) => {
          //   state.display = obj.enable ? 'visible' : 'none';
          // });
        }}
      >
        启用
      </Checkbox>
    );
  };

  return (
    <Collapse
      activeKey={_formCollapse?.activeKeys || []}
      onChange={(key) => _formCollapse?.setActiveKeys?.(key)}
      ghost
      expandIconPosition="left"
      className="dv-events-collapse parent-collapse no-parent-collapse-pd"
    >
      {Object.keys(value).map((f) => {
        return (
          <Panel
            header={value[f].description}
            key={f}
            forceRender
            collapsible={value[f].enable ? null : 'disabled'}
            extra={renderExtra(value[f], f)}
          >
            <ObjectField name={f}>
              <div>
                <table className="data-attr-table">
                  <thead className="table-head">
                    <tr className="table-head-row">
                      <th className="th-item column-item attr-name">字段</th>
                      <th className="th-item column-item attr-value">
                        绑定到变量
                        <Tooltip
                          overlayClassName="design-tip"
                          color="#2681ff"
                          placement="bottom"
                          title={
                            <span style={{ fontSize: 12 }}>
                              绑定变量，可用于其他组件请求数据时作为参数携带。注意：当多个字段同时绑定一个变量时会被覆盖。
                            </span>
                          }
                        >
                          <IconWidget style={{ cursor: 'help', margin: '2px 0 0 2px' }} infer="Help" />
                        </Tooltip>
                      </th>
                      <th className="th-item column-item attr-describe">字段说明</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <ArrayField name={'fields'} component={[ArrayComponent]} />
                    {/* {value[f]?.fields.map((item: IEventField, i: number) => (
                      <ObjectField name={`fields.${key}`} key={key}>
                        <tr className="table-body-row">
                          <td className="column-item attr-name">
                            <span>{key}</span>
                          </td>
                          <td className="column-item attr-value">
                            <Field name="map" component={[BlurInput, { size: 'small', placeholder: '可自定义' }]} />
                          </td>
                          <td className="column-item attr-describe">{value[f]?.fields[key].description}</td>
                        </tr>
                      </ObjectField>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </ObjectField>
          </Panel>
        );
      })}
    </Collapse>
  );
});

const ArrayComponent = observer(() => {
  const field = useField<ArrayFieldType>();
  return (
    <>
      {field.value?.map((item: IEventField, index) => (
        <ObjectField name={index} key={index}>
          <tr className="table-body-row">
            <td className="column-item attr-name">
              {item.extend ? (
                <Field name="key" component={[BlurInput, { size: 'small', placeholder: '字段key' }]} />
              ) : (
                <span>{item.key}</span>
              )}
            </td>
            <td className="column-item attr-value">
              <Field name="map" component={[BlurInput, { size: 'small', placeholder: '可自定义' }]} />
            </td>
            <td className="column-item attr-describe">
              {item.extend ? (
                <IconWidget onClick={() => field.remove(index)} infer="Remove" size={14} style={{ cursor: 'pointer' }} />
              ) : (
                <span>{item.des}</span>
              )}
            </td>
          </tr>
        </ObjectField>
      ))}
      <tr className="table-body-row" style={{ textAlign: 'center' }}>
        <td className="column-item" colSpan={3}>
          <Button
            size="small"
            icon={<IconWidget infer="Add" />}
            className="ds-action-btn"
            onClick={() =>
              field.push({
                key: '',
                map: '',
                extend: true,
              })
            }
          >
            &nbsp;新增一个字段
          </Button>
        </td>
      </tr>
      {/* <Button
        onClick={() => {
          field.push('');
        }}
      >
        Add
      </Button> */}
    </>
  );
});
