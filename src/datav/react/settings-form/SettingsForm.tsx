import React, { useMemo } from 'react';
import { Field, ObjectField, observer } from '@formily/react';
import { pageSchema } from '../schema/pageSchema';
import { Tabs } from 'antd';
import { SettingsEmpty, WidgetInfo } from './components';
import { baseAttrSchema } from '../schema/baseAttrSchema';
import { DataFields } from './DataFields';
import { useToolbar, useScreen } from '../hooks';
import { cancelIdle, requestIdle } from '../../shared';
import { useCurrentNode } from '../hooks/useCurrentNode';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd';
import { ISettingFormProps } from './types';
import { IWidgetSetting, IScreenProps } from '../interface';
import { EventFields } from './EventsFields';
import { SchemaField } from './SchemaField';
import { IconWidget } from '../components';
import { SettingsFormContext } from './context';
import { GlobalRegistry } from '../../core/registry';
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
      return createForm<IWidgetSetting | IScreenProps>({
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
        return <IconWidget infer={name} style={{ paddingLeft: 6 }} />;
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
    const compSchema = currentNode ? GlobalRegistry.getDesignerWidget(currentNode.info.type)?.DnConfig : null;
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
          <SettingsFormContext.Provider value={props}>
            <Form
              form={form}
              colon={false}
              labelWidth={84}
              labelAlign="left"
              wrapperAlign="right"
              feedbackLayout="none"
              tooltipLayout="text"
            >
              {currentNode && compSchema ? (
                <>
                  <Field name="info" component={[WidgetInfo]} />
                  <Tabs className="my-form-tab" animated={false} centered tabBarStyle={tabBarStyle}>
                    <Tabs.TabPane key="1" tab="属性" forceRender>
                      <SchemaField
                        components={props.components}
                        scope={scope}
                        schema={{
                          type: 'void',
                          properties: {
                            attr: baseAttrSchema,
                            options: compSchema.schema,
                          },
                        }}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab="数据" forceRender className="pl_10">
                      <ObjectField key={`${currentNode.id}`} name="data" component={[DataFields]} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="3" tab="交互" forceRender className="pl_10">
                      <ObjectField key={`${currentNode.id}`} name="events" component={[EventFields]} />
                    </Tabs.TabPane>
                  </Tabs>
                </>
              ) : (
                <SchemaField schema={pageSchema} components={props.components} scope={scope} />
              )}
            </Form>
          </SettingsFormContext.Provider>
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
