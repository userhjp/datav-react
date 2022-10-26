import React, { useMemo } from 'react';
import { Field, ObjectField, observer } from '@formily/react';
import { Tabs } from 'antd';
import { WidgetInfo } from './components';
import { DataFields } from './DataFields';
import { useToolbar, useScreen, useSelected } from '../hooks';
import { cancelIdle, requestIdle } from '../../shared';
import { useCurrentNode } from '../hooks/useCurrentNode';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd';
import { ISettingFormProps } from './types';
import { IScreenProps } from '../interface';
import { EventFields } from './EventsFields';
import { SchemaField } from './SchemaField';
import { IconWidget } from '../components';
import { SettingsFormContext } from './context';
import { useWidgets } from '../hooks/useWidgets';
import { layoutSchema, pageSchema, baseAttrSchema } from './schema';
import { StatusFields } from './StatusFields';
import { WidgetNode } from '@/datav/core';
import './styles.less';

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const toolbar = useToolbar();
    const currentNode = useCurrentNode();
    const selected = useSelected();
    const widgets = useWidgets();
    const screen = useScreen();
    const form = useMemo(() => {
      return createForm<WidgetNode | IScreenProps>({
        // initialValues: currentNode || screen.props,
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
    const compSchema = currentNode ? widgets[currentNode.info.type]?.DnConfig : null;
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
                  <Tabs
                    className="my-form-tab"
                    animated={false}
                    centered
                    tabBarStyle={tabBarStyle}
                    items={[
                      {
                        className: 'pl_10',
                        label: '属性',
                        key: 'item-1',
                        children: (
                          <SchemaField
                            key={currentNode.id}
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
                        ),
                      },
                      {
                        className: 'pl_10',
                        label: '数据',
                        key: 'item-2',
                        children: <ObjectField key={`${currentNode.id}`} name="data" component={[DataFields]} />,
                      },
                      {
                        className: 'pl_10',
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
                </>
              ) : (
                <>
                  {selected.length > 1 ? (
                    <SchemaField schema={layoutSchema} components={props.components} scope={scope} />
                  ) : (
                    <SchemaField schema={pageSchema} components={props.components} scope={scope} />
                  )}
                </>
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
