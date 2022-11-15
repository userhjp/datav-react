import React, { useMemo, useState, useEffect, useRef } from 'react';
import { RecursionField, useField, observer, ISchema, Field, ObjectField, useForm } from '@formily/react';
import { useCurrentNode } from '../../hooks/useCurrentNode';
import { useSelected, useWidgets } from '../../hooks';
import { baseAttrSchema } from '../schema';
import { WidgetInfo } from '../components';
import { Tabs } from 'antd';
import { EventFields } from './EventsFields';
import { StatusFields } from './StatusFields';
import { DataFields } from './DataFields';
import './index.less';

type SettingsTableProps = {
  schema?: ISchema;
};

export const SettingsTable: React.FC<SettingsTableProps> = observer((props) => {
  const [schema, setSchema] = useState(null);
  const oldSelectedRef = useRef<string>('');
  const currentNode = useCurrentNode();
  const widgets = useWidgets();
  const field = useField();
  const selected = useSelected();
  const form = useForm();

  useEffect(() => {
    if (selected.length !== 1 || selected[0] === oldSelectedRef.current) return;
    oldSelectedRef.current = selected[0];
    form.setValuesIn('component', null);
    form.clearFormGraph(`component.*`); // 回收字段模型
    const comp = currentNode ? widgets[currentNode.info.type]?.DnConfig : null;
    form.setValuesIn('component', currentNode);
    setSchema(comp?.schema ?? null);
  }, [selected]);

  const tabBarStyle: React.CSSProperties = useMemo(() => {
    return {
      height: 30,
      marginBottom: 44,
      backgroundColor: '#2e343c',
    };
  }, []);
  if (!schema) return <></>;

  return (
    <div key={oldSelectedRef.current}>
      <Field basePath={field.address} name="info" component={[WidgetInfo]} />
      <Tabs
        className="my-form-tab"
        animated={false}
        centered
        tabBarStyle={tabBarStyle}
        items={[
          {
            label: '属性',
            key: 'item-1',
            children: (
              <>
                <RecursionField basePath={field.address} name="attr" schema={baseAttrSchema} />
                <RecursionField basePath={field.address} name="options" schema={schema} />
              </>
            ),
          },
          {
            label: '数据',
            key: 'item-2',
            children: <ObjectField name="data" component={[DataFields]} />,
          },
          {
            label: '事件',
            key: 'item-3',
            children: (
              <>
                <ObjectField name="events" component={[EventFields]} />
                <ObjectField name="visible" component={[StatusFields]} />
              </>
            ),
          },
        ]}
      />
    </div>
  );
});
