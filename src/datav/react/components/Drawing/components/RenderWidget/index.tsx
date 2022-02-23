import { GlobalRegistry } from '@/datav/core/registry';
import { IWidgetNode } from '@/datav/react/interface';
import { useReqData } from '@/datav/react/hooks';
import { cancelIdle, requestIdle } from '@/datav/shared';
import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import React, { Suspense } from 'react';
import './index.less';

const GlobalState = {
  idleRequest: null,
};

export const RenderWidget: React.FC<{ nodeInfo: IWidgetNode }> = observer(
  ({ nodeInfo }) => {
    if (!nodeInfo.info || !nodeInfo.info.type) return <div />;
    const Component = GlobalRegistry.getDesignerWidget(nodeInfo.info.type);
    if (!Component) return <div />;
    const data = useReqData(nodeInfo.id, nodeInfo.data);
    const options = toJS(nodeInfo.options);

    if (!options) return <WidgetLoading />;
    return (
      <Suspense fallback={<WidgetLoading />}>
        <Component options={options} data={data} />
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

// / 加载lodaing组件
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
