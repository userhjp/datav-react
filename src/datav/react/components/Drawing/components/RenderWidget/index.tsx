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
    const Component = GlobalRegistry.getDesignerWidget(nodeInfo.info.type);
    const data = useReqData(nodeInfo.id, nodeInfo.data);
    const options = toJS(nodeInfo.options);

    if (!nodeInfo.info || !nodeInfo.info.type || nodeInfo.attr.isHide) return <div />;
    if (!options || !Component) return <WidgetLoading />;
    return (
      <Suspense fallback={<WidgetLoading />}>
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
