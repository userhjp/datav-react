import { GlobalRegistry } from '@/datav/core/registry';
import { ComType } from '@/datav/interface';
import { useReqData } from '@/datav/react/hooks';
import { cancelIdle, requestIdle } from '@/datav/shared';
import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import React, { Suspense } from 'react';
import './index.less';

const GlobalState = {
  idleRequest: null,
};

export const RenderWidget: React.FC<{ comp: ComType }> = observer(
  ({ comp }) => {
    if (!comp.info || !comp.info.type) return <div />;
    const Component = GlobalRegistry.getDesignerWidget(comp.info.type);
    if (!Component) return <div />;
    const data = useReqData(comp.id, comp.data);
    const options = toJS(comp.options);

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
