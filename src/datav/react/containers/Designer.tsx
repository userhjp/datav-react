import React, { useEffect, useRef } from 'react';
import { DesignerEngineContext } from '../context';
import { IDesignerProps } from '../types';
import { useDesigner } from '../hooks';
import { Layout } from './Layout';
import * as icons from '../icons';
import { GlobalRegistry } from '../../core/registry';
import { Engine } from '../../core';
import { LayerPanel, DesignHead, DragPanel, Drawing } from '../components';
import { SettingsForm } from '../settings-form/SettingsForm';
import { setNpmCDNRegistry } from '../settings-form/registry';
import '../styles.less';

GlobalRegistry.registerDesignerIcons(icons);
setNpmCDNRegistry('//unpkg.com');
export const Designer: React.FC<IDesignerProps> = (props) => {
  const engine = useDesigner();
  const ref = useRef<Engine>();
  useEffect(() => {
    GlobalRegistry.registerDesignerWidget(props.components);
  }, []);

  useEffect(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current.unmount();
        }
      }
      props.engine.mount();
      ref.current = props.engine;
    }
    return () => {
      if (props.engine) {
        props.engine.unmount();
      }
    };
  }, [props.engine]);

  if (engine) throw new Error('There can only be one Designable Engine Context in the React Tree');

  return (
    <Layout {...props}>
      <div
        className="visual-design"
        onContextMenu={(e) => {
          // e.preventDefault();
        }}
        onMouseDown={() => {
          ref.current.operation.cancelRename();
        }}
      >
        <DesignerEngineContext.Provider value={props.engine}>
          <DesignHead />
          <div className="datav-content">
            <LayerPanel />
            <DragPanel resourceData={props.resourceData} />
            <Drawing />
            <SettingsForm />
          </div>
        </DesignerEngineContext.Provider>
      </div>
    </Layout>
  );
};

Designer.defaultProps = {
  prefixCls: 'dv-',
  theme: 'light',
};
