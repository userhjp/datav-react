import React, { useMemo } from 'react';
import { Field, ObjectField, observer } from '@formily/react';
import { pageSchema } from '@/datav/react/schema/pageSchema';
import { Tabs } from 'antd';
import { Empty, WidgetInfo } from './components';
import { baseAttrSchema } from '../schema/baseAttrSchema';
import DataFields from './DataFields';
import { getComConfig } from '../widgets';
import { useToolbar, useScreen } from '@/datav/react/hooks';
import { cancelIdle, requestIdle } from '@/datav/shared';
import { useCurrentNode } from '@/datav/react/hooks/useCurrentNode';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd';
import { ISettingFormProps } from './types';
import { ComType, IScreenProps } from '@/datav/interface';
import { EventFields } from './EventsFields';
import { SchemaField } from './SchemaField';
import { IconWidget } from '../components';
import './styles.less';

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const toolbar = useToolbar();
    const currentNode = useCurrentNode();
    const screen = useScreen();
    const form = useMemo(() => {
      return createForm<ComType | IScreenProps>({
        initialValues: currentNode || screen.props,
        values: currentNode || screen.props,
        effects(form) {
          props.effects?.(form);
        },
      });
    }, [currentNode]);

    const scope = {
      ...props.scope,
      icon(name: string) {
        return {
          LinkOutlined: <IconWidget infer="Link" style={{ paddingLeft: 6 }} />,
        }[name];
      },
    };

    // useEffect(() => {
    //   form.addEffects('pageChange', () => {
    //     onFieldValueChange('*', (field, form) => {
    //       console.log('值变化了', form.values);
    //       console.log(screen.props.backgroundColor);
    //     });
    //   });
    //   return () => {
    //     form.removeEffects('pageChange');
    //   };
    // }, []);
    const compSchema = currentNode ? getComConfig(currentNode.info.type) : null;
    const tabBarStyle: React.CSSProperties = useMemo(() => {
      return {
        height: 30,
        marginBottom: 44,
        backgroundColor: '#2e343c',
      };
    }, []);

    const settingsStyle: React.CSSProperties = useMemo(() => {
      return {
        width: toolbar.config.show ? 310 : 0,
      };
    }, [toolbar.config.show]);

    return (
      <div onKeyDown={(e) => e.stopPropagation()} style={settingsStyle} className="dv-settings-form">
        <div style={{ width: 310, height: '100%' }}>
          <Form form={form} colon={false} labelWidth={84} labelAlign="left" wrapperAlign="right" feedbackLayout="none" tooltipLayout="text">
            {currentNode && compSchema ? (
              <>
                <Field name="info" component={[WidgetInfo, {}]} />
                <Tabs className="my-form-tab" animated={false} centered tabBarStyle={tabBarStyle}>
                  <Tabs.TabPane key="1" tab="属性" forceRender>
                    <SchemaField name="attr" schema={baseAttrSchema} components={props.components} scope={scope} />
                    <SchemaField name="options" schema={compSchema.attr} components={props.components} scope={scope} />
                  </Tabs.TabPane>
                  <Tabs.TabPane key="2" tab="数据" forceRender className="pl_10">
                    {compSchema.data ? (
                      <ObjectField key={`${currentNode.id}`} name="data" component={[DataFields]} />
                    ) : (
                      <Empty title="该组件无需配置数据" />
                    )}
                  </Tabs.TabPane>
                  <Tabs.TabPane key="3" tab="交互" forceRender className="pl_10">
                    {compSchema.events ? (
                      <ObjectField key={`${currentNode.id}`} name="event" component={[EventFields]} />
                    ) : (
                      <Empty title="该组件没有交互事件" />
                    )}
                  </Tabs.TabPane>
                </Tabs>
              </>
            ) : (
              <SchemaField schema={pageSchema} components={props.components} scope={scope} />
            )}
          </Form>
        </div>
      </div>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  }
);
