import React, { useMemo, useState } from 'react';
import { Collapse, Badge, Switch, Tabs, Button } from 'antd';
import { model, markRaw, toJS } from '@formily/reactive';
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse';
import { useField, observer, useFieldSchema, RecursionField } from '@formily/react';
import { Schema } from '@formily/json-schema';
import { toArr } from '@formily/shared';
import { ArrayField, Field, FormPath, ObjectField } from '@formily/core';
import { IconWidget } from '../../../components';
import './index.less';

type ActiveKeys = string | number | Array<string | number>;

type ActiveKey = string | number;
export interface IFormCollapse {
  activeKeys: ActiveKeys;
  hasActiveKey(key: ActiveKey): boolean;
  setActiveKeys(key: ActiveKeys): void;
  addActiveKey(key: ActiveKey): void;
  removeActiveKey(key: ActiveKey): void;
  toggleActiveKey(key: ActiveKey): void;
}

export interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse;
  switch?: boolean; // 是否显示switch开关
  title: string;
  key?: string;
  defaultSwitch?: boolean; // 默认是否开启
  mapSwitchKey?: string; // 开关key值 默认 show
  maxItems?: string; // tab最大数
  noPadding?: boolean; // 是否保留子级Collapse内容上下边距，如果子级第一个元素就是 Collapse设置为false好看些
  isOpen?: boolean;
}

type ComposedFormCollapse = React.FC<IFormCollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>;
  createFormCollapse?: (defaultActiveKeys?: ActiveKeys) => IFormCollapse;
};

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

export const MyFormCollapse: ComposedFormCollapse = observer(({ formCollapse, ...props }) => {
  const field: ArrayField | ObjectField = useField();
  const { mapSwitchKey = 'show' } = props;
  const schema: any = useFieldSchema();
  const arrValue = Array.isArray(field.value) ? field.value : [];
  const [activeKey, setActiveKey] = useState('tab-0');
  const dataSource = arrValue?.length ? arrValue : [{}];
  const _formCollapse = useMemo(() => {
    return formCollapse ? formCollapse : createFormCollapse(props.isOpen ? [schema.name] : []);
  }, []);

  const getFieldValue = (schema: Schema) => {
    try {
      return (schema.type === 'object' ? field['value'] : field?.parent['value']) || {};
    } catch (error) {
      const value = field.form.getValuesIn(field.props.basePath) || {};
      return value;
    }
  };

  const takeActiveKeys = () => {
    if (props.activeKey) return props.activeKey;
    if (_formCollapse?.activeKeys) return _formCollapse?.activeKeys;
    return [];
  };

  const SwitchPanel: React.FC<IFormCollapseProps> = observer((props) => {
    const value = getFieldValue(schema);
    // const basePath = `${field.props.basePath}.${schema.name}`;
    // if (value[mapSwitchKey] === undefined) {
    //   value[mapSwitchKey] = !!props.defaultSwitch;
    // }
    // if (!value[mapSwitchKey] && _formCollapse.hasActiveKey(schema.name)) {
    //   _formCollapse.removeActiveKey(schema.name);
    // }
    // field.form.setFieldState(`${basePath}.*`, (state) => {
    //   if (FormPath.parse('options.*.type').match((state as Field).path.entire)) {
    //     state.hidden = !value[mapSwitchKey];
    //   } else {
    //     state.display = value[mapSwitchKey] ? 'visible' : 'none';
    //   }
    // });
    return (
      <Switch
        onClick={(_, event) => {
          event.stopPropagation();
        }}
        onChange={(checked) => {
          if (!checked && _formCollapse.hasActiveKey(schema.name)) {
            _formCollapse.removeActiveKey(schema.name);
          }
          value[mapSwitchKey] = checked;
        }}
        size="small"
        checked={!!value[mapSwitchKey]}
      />
    );
  });

  const RenderExtra: React.FC<IFormCollapseProps> = observer((props) => {
    return Array.isArray(field.value) ? (
      <>
        {_formCollapse.hasActiveKey(schema.name) && (
          <div className="btn-s" style={{ paddingRight: 10 }}>
            <Button type="link" disabled={field.value.length >= schema.maxItems} onClick={(e) => tabsBtnClick(e, 'copy')} title="复制">
              <IconWidget className="space-icon" infer="Copy" style={{ fontSize: 13 }} />
            </Button>
            <Button type="link" disabled={field.value.length >= schema.maxItems} onClick={(e) => tabsBtnClick(e, 'add')} title="添加">
              <IconWidget className="space-icon" infer="Add" style={{ fontSize: 13 }} />
            </Button>
            <Button type="link" disabled={field.value.length < 2} onClick={(e) => tabsBtnClick(e, 'remove')} title="删除">
              <IconWidget className="space-icon" infer="Delete" style={{ fontSize: 13 }} />
            </Button>
          </div>
        )}
      </>
    ) : (
      <>{props.switch && <SwitchPanel {...props} />}</>
    );
  });

  const BadgedTab: React.FC<{ index: number }> = ({ index }) => {
    const tab = (
      <span>
        {props.title || 'Untitled'} {index + 1}
      </span>
    );
    const path = field.address.concat(index);
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${path}.**`,
    });
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {tab}
        </Badge>
      );
    }
    return tab;
  };

  const tabsBtnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, type: 'copy' | 'add' | 'remove') => {
    e.stopPropagation();
    const index = +activeKey.match(/-(\d+)/)?.[1];
    switch (type) {
      case 'copy':
        const copyVal = dataSource[index];
        (field as ArrayField).push(toJS(copyVal));
        break;
      case 'add':
        const addVal = dataSource[index];
        (field as ArrayField).push(toJS(addVal));
        setActiveKey(`tab-${dataSource.length - 1}`);
        break;
      case 'remove':
        (field as ArrayField).remove(Number(index));
        const keyIdx = index - 1 < 0 ? 0 : index - 1;
        setActiveKey(`tab-${keyIdx}`);
        break;
    }
  };

  // useLayoutEffect(() => {
  //   if (props.isOpen && !_formCollapse.hasActiveKey(schema.name)) {
  //     _formCollapse?.setActiveKeys?.(schema.name);
  //   }
  // }, [props.isOpen]);

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      className={`my-form-collapse parent-collapse ${props.noPadding ? 'no-parent-collapse-pd' : ''} ${props.className || ''}`}
      activeKey={takeActiveKeys()}
      onChange={(key) => _formCollapse?.setActiveKeys?.(key)}
    >
      <Collapse.Panel
        className={`${schema.type === 'array' ? 'tablist-collapse-panel' : ''}`}
        collapsible={props.switch && !Array.isArray(field.value) && !getFieldValue(schema)[mapSwitchKey] ? 'disabled' : null}
        extra={<RenderExtra {...props} />}
        header={props.title}
        key={schema.name}
        forceRender
      >
        {schema.type === 'array' ? (
          <Tabs
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            className="tablist-collapse-panel-tab"
            items={dataSource?.map((m, i) => {
              return {
                closable: i !== 0,
                label: <BadgedTab index={i} />,
                key: `tab-${i}`,
                children: <RecursionField schema={Array.isArray(schema.items) ? schema.items[i] : schema.items} name={i} />,
              };
            })}
          />
        ) : (
          <>
            {schema.mapProperties((schema, name) => {
              return <RecursionField key={name} schema={schema} name={name} />;
            })}
          </>
        )}
      </Collapse.Panel>
    </Collapse>
  );
});

MyFormCollapse.createFormCollapse = createFormCollapse;
