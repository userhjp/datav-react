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
setNpmCDNRegistry('//unpkg.com');
GlobalRegistry.registerDesignerIcons(icons);
export const Designer: React.FC<IDesignerProps> = ({ components, engine, material, ...props }) => {
  const pEngine = useDesigner();
  const ref = useRef<Engine>();

  useEffect(() => {
    if (engine) {
      if (engine && ref.current) {
        if (engine !== ref.current) {
          ref.current.unmount();
        }
      }
      engine.mount();
      ref.current = engine;
    }
    return () => {
      if (engine) {
        engine.unmount();
      }
    };
  }, [engine]);
  if (pEngine) throw new Error('There can only be one Designable Engine Context in the React Tree');

  return (
    <Layout {...props}>
      <div
        className="visual-design"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onMouseDown={() => {
          ref.current.operation.cancelRename();
        }}
      >
        <DesignerEngineContext.Provider value={{ engine, components, material }}>
          <DesignHead />
          <div className="datav-content">
            <LayerPanel />
            <DragPanel />
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
