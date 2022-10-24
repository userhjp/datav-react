import { IVisible } from '../../../../interface';
import { useDataSource } from '../../../../hooks';
import { cancelIdle, requestIdle } from '../../../../../shared';
import { autorun, toJS } from '@formily/reactive';
import React, { Suspense, useEffect, useState } from 'react';
import { useWidgets } from '@/datav/react/hooks/useWidgets';
import { DvData } from '@/datav/core/models/DvData';
import { observer } from '@formily/react';
import { WidgetNode } from '@/datav/core';

import './index.less';

const GlobalState = {
  idleRequest: null,
};

export const RenderWidget: React.FC<{ node: WidgetNode }> = observer(
  ({ node }) => {
    const options = toJS(node.options);
    if (!node.info?.type || node.isHide) return <div />;
    return (
      <ErrorBoundary
        name={node.info.type}
        onError={(msg) => {
          node.setError({
            title: '组件内部异常',
            content: msg,
          });
        }}
        onClear={() => node.clearError()}
      >
        <ConnectData options={options} node={node} />
      </ErrorBoundary>
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

// 加载lodaing组件
export const WidgetLoading: React.FC = () => {
  return (
    <div className="widget-loading">
      <div className="pulse-container">
        <div className="pulse-bubble pulse-bubble-1" />
        <div className="pulse-bubble pulse-bubble-2" />
        <div className="pulse-bubble pulse-bubble-3" />
      </div>
    </div>
  );
};

const ConnectData: React.FC<{ node: WidgetNode; options: Record<string, any> }> = observer(({ children, node, options }) => {
  const [data, setData] = useState(null);
  const dataSource = useDataSource();
  const widgets = useWidgets();
  const Widget: any = widgets[node.info.type];
  const opt = {
    key: node.id,
    options,
    data,
    events: node.events,
    id: node.id,
    info: node.info,
    attr: node.attr,
  };

  useEffect(() => {
    if (!node.data) return null;
    const dvdata = new DvData({
      dataSource,
      id: node.id,
      dataSetting: node.data,
    });
    dataSource.setData(node.id, dvdata);
    const dispose = autorun(() => {
      setData(toJS(dvdata.data));
    });
    return () => {
      dispose();
      dataSource.removeData(node.id);
    };
  }, []);
  if (JSON.stringify(options) === '{}') return <WidgetLoading />;
  return (
    <Visible visible={node.visible}>
      <Suspense fallback={<WidgetLoading />}>
        <Widget {...opt}>{children}</Widget>
      </Suspense>
    </Visible>
  );
});

const Visible: React.FC<{ visible: IVisible; children: React.ReactNode }> = observer(({ visible, children }) => {
  const dataSource = useDataSource();
  const isVisible = visible.key && dataSource.variables[visible.key] === visible.val;
  if (visible.enable && visible.renderDom) {
    return <div style={{ width: '100%', height: '100%', opacity: isVisible ? 1 : 0 }}>{children}</div>;
  }
  if (!visible.enable || isVisible) return <>{children}</>;
  return <div />;
});

class ErrorBoundary extends React.Component<{
  name: string;
  onError: (message: string) => void;
  onClear: () => void;
  children: React.ReactNode;
}> {
  state = {
    hasError: false,
    errorMsg: '',
  };

  static getDerivedStateFromError(error) {
    // 渲染能够显示降级后的 UI
    return { hasError: true, errorMsg: error.toString() };
  }

  componentDidUpdate(prevProps: Readonly<{ name: string; onError: (message: string) => void }>, prevState: any): void {
    if (this.state.hasError && prevState.hasError) {
      this.setState({
        hasError: false,
        errorMsg: '',
      });
      this.props.onClear();
    }
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error.toString());
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#ff572229',
            fontSize: 18,
            color: '#ffeb3b',
          }}
        >
          <div>
            <div style={{ textAlign: 'center' }}>{this.props.name} 组件异常：</div>
            <div style={{ padding: 10 }}>{this.state.errorMsg}</div>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
