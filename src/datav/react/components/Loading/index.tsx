import './index.less';
import React from 'react';

// / 加载lodaing组件
export const WidgetLoading: React.FC = () => {
  return (
    <div className="widget-loading">
      {/* <div>
            <div className="spot spot1"></div>
            <div className="spot spot2"></div>
            <div className="spot spot3"></div>
        </div> */}
      {/* <div className="loader loader-3">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
        </div> */}
      <div className="pulse-container">
        <div className="pulse-bubble pulse-bubble-1" />
        <div className="pulse-bubble pulse-bubble-2" />
        <div className="pulse-bubble pulse-bubble-3" />
      </div>
    </div>
  );
};
