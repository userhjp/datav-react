import React, { useMemo } from 'react';
import { Observer } from '@formily/react';
import { useToolbar, useScreen } from '../hooks';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd';
import { ISettingFormProps } from './types';
import { IScreenProps } from '../interface';
import { SchemaField } from './SchemaField';
import { IconWidget } from '../components';
import { SettingsFormContext } from './context';
import { SettingsTable } from './SettingsTable';
import { WidgetNode } from '@/datav/core';
import { SettingsPage } from './SettingsPage';
import { observable } from '@formily/reactive';
import './styles.less';

export const SettingsForm: React.FC<ISettingFormProps> = (props) => {
  const toolbar = useToolbar();
  const screen = useScreen();
  const form = useMemo(() => {
    return createForm<{
      component: WidgetNode;
      pages: IScreenProps;
    }>({
      values: observable({
        component: null,
        pages: screen,
      }),
      effects(form) {
        props.effects?.(form);
      },
    });
  }, []);

  const scope = useMemo(() => {
    return {
      ...props.scope,
      icon(name: string) {
        return <IconWidget infer={name} style={{ paddingLeft: 6 }} />;
      },
    };
  }, []);

  return (
    <Observer>
      {() => (
        <div onKeyDown={(e) => e.stopPropagation()} style={{ width: toolbar.config.show ? 310 : 0 }} className="dv-settings-form">
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
                <SchemaField scope={scope} components={{ SettingsTable, SettingsPage, ...props.components }}>
                  <SchemaField.Object name="component" x-component="SettingsTable" />
                  <SchemaField.Object name="pages" x-component="SettingsPage" />
                </SchemaField>
              </Form>
            </SettingsFormContext.Provider>
          </div>
        </div>
      )}
    </Observer>
  );
};
