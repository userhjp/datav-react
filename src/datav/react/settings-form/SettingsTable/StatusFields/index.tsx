import React, { useEffect } from 'react';
import { ObjectField as ObjectFieldType } from '@formily/core';
import { Field, observer, useField } from '@formily/react';
import { toArr } from '@formily/shared';
import { Checkbox as AntCheckbox, Collapse } from 'antd';
import { useMemo } from 'react';
import { IDataSetting } from '../../../interface';
import { Tooltip } from 'antd';
import { BlurInput } from '../../components';
import { IconWidget } from '../../../components';
import { markRaw, model } from '@formily/reactive';
import { Checkbox } from '@formily/antd';
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

export const StatusFields: React.FC = observer(() => {
  const field = useField<ObjectFieldType<IDataSetting>>();
  const _formCollapse = useMemo(() => createFormCollapse(), []);

  useEffect(() => {
    if (!field.value.enable) _formCollapse?.removeActiveKey('1');
  }, [field.value.enable]);

  const renderExtra = (key: string) => {
    return (
      <AntCheckbox
        checked={field.value.enable}
        style={{ color: '#bcc9d4', fontSize: '12px' }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => (field.value.enable = e.target.checked)}
      >
        启用
      </AntCheckbox>
    );
  };

  return (
    <Collapse
      activeKey={_formCollapse?.activeKeys || []}
      onChange={(key) => _formCollapse?.setActiveKeys?.(key)}
      ghost
      expandIconPosition="start"
      className="dv-events-collapse parent-collapse no-parent-collapse-pd"
    >
      <Panel
        key={'1'}
        header={
          <span>
            隐藏组件&nbsp;
            <Tooltip
              overlayClassName="design-tip"
              color="#2681ff"
              placement="bottom"
              title={<span style={{ fontSize: 12 }}>监听其他组件或事件绑定到全局作用域的变量，实现跨组件控制组件显示隐藏。</span>}
            >
              <IconWidget style={{ cursor: 'help', margin: '2px 0 0 2px', color: '#1890ff' }} infer="Help" />
            </Tooltip>
          </span>
        }
        forceRender
        collapsible={field.value.enable ? null : 'disabled'}
        extra={renderExtra('1')}
      >
        <div style={{ paddingBottom: 10 }}>
          <table className="data-attr-table">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="th-item column-item attr-name">当变量</th>
                <th className="th-item column-item attr-value">值等于</th>
                <th className="th-item column-item attr-describe">组件动作</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-body-row">
                <td className="column-item attr-name">
                  <Field name="key" component={[BlurInput, { size: 'small', placeholder: 'key' }]} />
                </td>
                <td className="column-item attr-value">
                  <Field name="val" component={[BlurInput, { size: 'small', placeholder: 'value' }]} />
                </td>
                <td className="column-item attr-describe">
                  <span>显示组件</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <label style={{ padding: '0 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Field name="renderDom" component={[Checkbox]} />
              &nbsp;
              <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 12 }}>隐藏时保留DOM</span>
              <Tooltip
                overlayClassName="design-tip"
                color="#2681ff"
                placement="bottom"
                title={<span style={{ fontSize: 12 }}>只隐藏组件不销毁，保留组件内部事件及状态，反之销毁组件，再次显示时重新渲染。</span>}
              >
                <IconWidget style={{ cursor: 'help', margin: '2px 0 0 2px', color: '#1890ff' }} infer="Help" />
              </Tooltip>
            </label>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
});
