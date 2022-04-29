import { GlobalRegistry } from '../../../../../core/registry';
import { IWidgetSetting } from '../../../../interface';
import { useReqData } from '../../../../hooks';
import { cancelIdle, requestIdle } from '../../../../../shared';
import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import React, { Suspense } from 'react';
import './index.less';

const GlobalState = {
  idleRequest: null,
};

export const RenderWidget: React.FC<{ nodeInfo: IWidgetSetting }> = observer(
  ({ nodeInfo }) => {
    const Component: any = GlobalRegistry.getDesignerWidget(nodeInfo.info.type);
    const data = useReqData(nodeInfo.id, nodeInfo.data);
    const options = toJS(nodeInfo.options);

    if (!nodeInfo.info || !nodeInfo.info.type || nodeInfo.attr.isHide) return <div />;
    if (!options || !Component) return <WidgetLoading />;
    return (
      <Suspense fallback={<WidgetLoading />}>
        <ErrorBoundary name={nodeInfo.info.type}>
          <Component
            {...{
              options,
              data,
              events: nodeInfo.events,
              id: nodeInfo.id,
              info: nodeInfo.info,
              attr: nodeInfo.attr,
            }}
          />
        </ErrorBoundary>
      </Suspense>
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

export class ErrorBoundary extends React.Component<{ name: string }> {
  state = {
    hasError: false,
    errorMsg: '',
  };

  static getDerivedStateFromError(error) {
    // 渲染能够显示降级后的 UI
    return { hasError: true, errorMsg: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
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
