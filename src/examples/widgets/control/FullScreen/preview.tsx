import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import { useFullscreen } from 'ahooks';
import './styles.less';

const FullScreen: React.FC<IWidgetProps> = ({ options, events }) => {
  const updateVariables = useDatavEvent(events.changed, null, false);
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(document.body);

  const checkFullScreen = () => {
    if (isFullscreen) {
      exitFullscreen();
      updateVariables({ isFullScreen: false });
    } else {
      enterFullscreen();
      updateVariables({ isFullScreen: true });
    }
  };

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    background: `url(${isFullscreen ? options.exitFullScreen : options.fullScreen}) 0% 0% / 100% 100% no-repeat`,
  };

  return (
    <div
      className="full-screen-widget"
      title={isFullscreen ? '退出全屏' : '全屏'}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: options.backgroundColor,
        borderRadius: options.borderRadius || 0,
        overflow: 'hidden',
      }}
    >
      <div style={style} onClick={checkFullScreen} />
    </div>
  );
};

export default FullScreen;
