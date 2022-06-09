import { IVisible, IWidgetSetting } from '../../../../interface';
import { useDataSource } from '../../../../hooks';
import { cancelIdle, requestIdle } from '../../../../../shared';
import { autorun, toJS } from '@formily/reactive';
import React, { Suspense, useEffect, useState } from 'react';
import { useWidgets } from '@/datav/react/hooks/useWidgets';
import { DvData } from '@/datav/core/models/DvData';
import { observer } from '@formily/react';
import './index.less';

const GlobalState = {
  idleRequest: null,
};

export const RenderWidget: React.FC<{ widgetInfo: IWidgetSetting }> = observer(
  ({ widgetInfo }) => {
    const dataSource = useDataSource();
    const widgets = useWidgets();
    const [data, setData] = useState(null);
    const Widget: any = widgets[widgetInfo.info.type];

    useEffect(() => {
      if (!widgetInfo.data) return null;
      const dvdata = new DvData({
        dataSource,
        id: widgetInfo.id,
        dataSetting: widgetInfo.data,
      });
      dataSource.setData(widgetInfo.id, dvdata);
      const dispose = autorun(() => {
        setData(toJS(dvdata.data));
      });
      return () => {
        dispose();
        dataSource.removeData(widgetInfo.id);
      };
    }, []);
    const options = toJS(widgetInfo.options);
    if (!widgetInfo.info || !widgetInfo.info.type || widgetInfo.attr.isHide) return <div />;
    if (!options || !Widget || JSON.stringify(options) === '{}') return <WidgetLoading />;
    return (
      <Suspense fallback={<WidgetLoading />}>
        <ErrorBoundary
          name={widgetInfo.info.type}
          onError={(msg) => {
            dataSource.engine.global.addError({
              id: widgetInfo.id,
              title: '组件内部异常',
              content: msg,
            });
          }}
        >
          <Visible visible={widgetInfo.visible}>
            <Widget
              {...{
                options,
                data,
                events: widgetInfo.events,
                id: widgetInfo.id,
                info: widgetInfo.info,
                attr: widgetInfo.attr,
              }}
            />
          </Visible>
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

const Visible: React.FC<{ visible: IVisible }> = observer(({ visible, children }) => {
  const dataSource = useDataSource();
  const isShow = visible.enable && visible.key ? dataSource.variables[visible.key] === visible.val : true;
  if (!isShow) return <div />;
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
});

class ErrorBoundary extends React.Component<{ name: string; onError: (message: string) => void }> {
  state = {
    hasError: false,
    errorMsg: '',
  };

  static getDerivedStateFromError(error) {
    // 渲染能够显示降级后的 UI
    return { hasError: true, errorMsg: error.toString() };
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
