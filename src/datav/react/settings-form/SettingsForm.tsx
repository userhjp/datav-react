import React, { useMemo } from 'react';
import { observer } from '@formily/react';
import { useToolbar, useScreen } from '../hooks';
import { cancelIdle, requestIdle } from '../../shared';
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
import './styles.less';
import { observable } from '@formily/reactive';

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const toolbar = useToolbar();
    const screen = useScreen();
    const form = useMemo(() => {
      return createForm<{
        component: WidgetNode;
        pages: IScreenProps;
      }>({
        values: observable({
          component: null,
          pages: screen.props,
        }),
        effects(form) {
          props.effects?.(form);
        },
      });
    }, []);

    const scope = {
      ...props.scope,
      icon(name: string) {
        return <IconWidget infer={name} style={{ paddingLeft: 6 }} />;
      },
    };

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
              <SchemaField scope={scope} components={{ SettingsTable, SettingsPage, ...props.components }}>
                <SchemaField.Object name="component" x-component="SettingsTable" />
                <SchemaField.Object name="pages" x-component="SettingsPage" />
              </SchemaField>
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
