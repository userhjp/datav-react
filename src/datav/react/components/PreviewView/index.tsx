import { observer } from '@formily/react';
import { autorun } from '@formily/reactive';
import React, { useCallback, useEffect, useState } from 'react';
import { ZoomMode } from '../../../shared';
import { IWidgetSetting } from '../../interface';
import { useOperation, useScreen } from '../../hooks';
import { RenderWidget } from '../Drawing/components/RenderWidget';
import { useDebounceFn } from 'ahooks';
import './index.less';

const resizeAuto = (width: number, height: number): React.CSSProperties => {
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;
  const ratioX = cw / width;
  const ratioY = ch / height;
  return {
    transform: `scale(${ratioX}, ${ratioY})`,
    transformOrigin: 'left top',
    backgroundSize: '100% 100%',
  };
};

const resizeWidth = (width: number): React.CSSProperties => {
  const ratio = document.documentElement.clientWidth / width;
  return {
    transform: `scale(${ratio})`,
    transformOrigin: 'left top',
    backgroundSize: '100%',
  };
};

const resizeHeight = (width: number, height: number): React.CSSProperties => {
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;
  const ratio = ch / height;
  const gap = (cw - width * ratio) / 2;
  return {
    transform: `scale(${ratio})`,
    transformOrigin: 'left top',
    backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
    backgroundPosition: `${gap.toFixed(3)}px top`,
    marginLeft: `${gap.toFixed(3)}px`,
  };
};

const resizeFull = (width: number, height: number): React.CSSProperties => {
  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;
  const ratio = ch / height;
  const gap = (cw - width * ratio) / 2;
  return {
    transform: `scale(${ratio})`,
    transformOrigin: 'left top',
    backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
    backgroundPosition: `${gap.toFixed(3)}px top`,
  };
};

const resizeNone = (): React.CSSProperties => {
  return {
    overflow: 'hidden',
    position: 'relative',
  };
};

export const PreviewView: React.FC = observer(() => {
  const operation = useOperation();
  const screen = useScreen();
  const [pageStyle, setPageStyle] = useState<React.CSSProperties>();

  const transformStyle = useCallback((com: IWidgetSetting): React.CSSProperties => {
    const { attr } = com;
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      width: attr.w,
      height: attr.h,
      transform: `translate(${attr.x}px, ${attr.y}px)`,
    };
  }, []);

  const comStyle = useCallback((com: IWidgetSetting): React.CSSProperties => {
    const { attr } = com;
    return {
      height: '100%',
      opacity: attr.opacity,
      transform: `rotate(${attr.deg || 0}deg)`,
    };
  }, []);

  const changePageStyle = () => {
    if (!screen) return;
    let style = {};
    switch (screen.props.zoomMode) {
      case ZoomMode.auto:
        style = resizeAuto(screen.props.width, screen.props.height);
        break;
      case ZoomMode.width:
        style = resizeWidth(screen.props.width);
        break;
      case ZoomMode.height:
        style = resizeHeight(screen.props.width, screen.props.height);
        break;
      case ZoomMode.full:
        style = resizeFull(screen.props.width, screen.props.height);
        break;
      default:
        style = resizeNone();
        break;
    }
    setPageStyle({
      backgroundColor: screen.props.backgroundColor,
      backgroundImage: screen.props?.backgroundImg ? `url(${screen.props.backgroundImg})` : 'none',
      position: 'relative',
      width: `${screen.props.width}px`,
      height: `${screen.props.height}px`,
      overflow: 'hidden',
      ...style,
    });
  };

  const { run } = useDebounceFn(() => changePageStyle(), {
    wait: 100,
  });

  useEffect(() => {
    window.addEventListener('resize', run);
    const dispose = autorun(() => {
      if (screen) {
        changePageStyle();
      }
    });
    return () => {
      dispose();
      window.removeEventListener('resize', run);
    };
  }, []);

  return (
    <div className="screen-view" style={pageStyle}>
      {operation.components
        .map((item) => (
          <div key={item.id} style={transformStyle(item)}>
            <div style={comStyle(item)}>
              <RenderWidget nodeInfo={item} />
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
});
