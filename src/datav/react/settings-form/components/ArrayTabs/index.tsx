import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import { ArrayField } from '@formily/core';
import { useField, observer, useFieldSchema, RecursionField } from '@formily/react';
import { TabsProps } from 'antd/lib/tabs';
import './index.less';

export const ArrayTabs: React.FC<TabsProps> = observer((props) => {
  const field = useField<ArrayField>();
  const schema = useFieldSchema();
  const [activeKey, setActiveKey] = useState('tab-0');
  const value = Array.isArray(field.value) ? field.value : [];
  const dataSource = value?.length ? value : [{}];

  const badgedTab = (index: number) => {
    const tab = `${field.title || 'Untitled'} ${index + 1}`;
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
  return (
    <Tabs
      {...props}
      activeKey={activeKey}
      onChange={(key) => {
        setActiveKey(key);
      }}
      items={dataSource?.map((m, i) => {
        return {
          closable: i !== 0,
          label: badgedTab(i),
          key: `tab-${i}`,
          children: <RecursionField schema={Array.isArray(schema.items) ? schema.items[i] : schema.items} name={i} />,
        };
      })}
      // type="editable-card"
      // onEdit={onEdit}
    />
  );
});
