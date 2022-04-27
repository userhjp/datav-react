import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { Carousel as AntCarousel } from 'antd';
import './styles.less';

const Carousel: React.FC<IWidgetProps> = ({ options, events, data, attr }) => {
  // const [value, setValue] = useState<string>('');
  // const updateVariables = useDatavEvent(events.changed, null, false);

  // const { run } = useDebounceFn(
  //   () => {
  //     updateVariables({ dateStr: value });
  //   },
  //   {
  //     wait: 500,
  //   }
  // );

  const config = {
    slidesToShow: 1, // 显示3个
    slidesToScroll: 1, // 每次滚动1个
    draggable: false, // 允许拖拽滚动
    swipeToSlide: true,
    easing: 'linear',
    pauseOnFocus: false, // focus时暂停
    pauseOnDotsHover: false, // 在点上悬停时防止自动播放
    pauseOnHover: true, // 鼠标悬浮暂停
    lazyLoad: true, // 延迟加载
    ...options.config,
    ...options.advancedSetting,
  };

  const openUrl = (herf: string) => {
    if (herf) window.open(herf);
  };

  return (
    <div className="widgets-carousel">
      <AntCarousel {...config}>
        {(data || []).map((m, key) => {
          return (
            <div key={key}>
              <div
                style={{
                  width: '100%',
                  height: attr.h,
                  padding: `${options.advancedSetting?.padding?.vertical}px ${options.advancedSetting?.padding?.horizontal}px`,
                }}
              >
                <div
                  onClick={() => openUrl(m.herf)}
                  style={{
                    cursor: m.herf ? 'pointer' : 'default',
                    width: '100%',
                    height: '100%',
                    background: `url(${m.imgurl}) 0% 0% / 100% 100% no-repeat`,
                    overflow: 'hidden',
                    ...options.style,
                  }}
                />
              </div>
            </div>
          );
        })}
      </AntCarousel>
    </div>
  );
};

export default Carousel;
