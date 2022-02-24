import React, { useEffect, useMemo } from 'react';
import { PreviewView } from '../components';
import { DesignerEngineContext } from '../context';
import { createDesigner } from '../../core';
import { IDesignerComponents } from '../types';
import { PageType } from '../interface';

type PreviewProps = {
  data: PageType;
  loading?: boolean;
  components?: IDesignerComponents;
};

export const Preview: React.FC<PreviewProps> = (props) => {
  const { data, loading = false } = props;
  const engine = useMemo(() => createDesigner(), []);

  useEffect(() => {
    if (data) {
      engine.setInitialValue(data);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      engine.toolbar.addLoading();
    } else {
      engine.toolbar.removeLoading();
    }
  }, [loading]);

  const style: React.CSSProperties = useMemo(() => {
    return {
      height: '100%',
      backgroundColor: '#f7f7f7',
    };
  }, []);

  return (
    <div style={style}>
      <DesignerEngineContext.Provider value={engine}>
        <PreviewView />
      </DesignerEngineContext.Provider>
    </div>
  );
};
