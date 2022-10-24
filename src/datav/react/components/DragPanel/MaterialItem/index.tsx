import { Select } from 'antd';
import React, { useMemo, useState } from 'react';
import { DragItem } from '../DragItem';
import { titleBgBorder, pageBgBorder, videoData, bgBorderData, decorateData, bgImg, smallTitleBgBorder } from './data';
import './index.less';

//  'video' | 'icon' | 'bgImg' | 'bgBorder' | 'decorate'
const materialType = [
  { name: '视频', type: 'video' },
  // { name: '图标', type: 'icon' },
  // { name: '点缀', children: [] },
  { name: '背景图', type: 'bgImg' },
  { name: '背景框', type: 'bgBorder' },
  { name: '装饰条', type: 'decorate' },
];

const MaterialItem: React.FC = () => {
  const [activate, setActivate] = useState('video');

  return (
    <div className={`material-item ${materialType.length > 0 ? 'twolevel-warp' : ''}`}>
      <div className="classify-warp">
        {materialType.map((m, i) => (
          <div key={i} className={`${activate === m.type ? 'activate' : ''}`} onClick={() => setActivate(m.type)}>
            {m.name}
          </div>
        ))}
      </div>
      <div className="item-cont scoll-prettify">
        {activate === 'bgImg' && <RenderBgImg />}
        {activate === 'decorate' && <RenderDecorateStrip />}
        {activate === 'bgBorder' && <RenderBgBorder />}
        {activate === 'video' && <RenderVideo />}
        {/* {activateList.length > 0 ? <></> : <SettingsEmpty title="暂无可用素材" />} */}
      </div>
    </div>
  );
};
export default MaterialItem;

const RenderDragItem: React.FC<{
  name: string;
  type?: 'SingleImg' | 'BgBox' | 'VideoPlayer';
  cover?: string;
  url: string;
  width?: number;
  height?: number;
  config?: { [key: string]: any };
}> = (props) => {
  const { name, cover, width, type, height, url, config = {} } = props;
  let widgetType = type;
  if (!widgetType) widgetType = config.slice && config.width ? 'BgBox' : 'SingleImg';

  const dnConfig: any = useMemo(() => {
    const widgetConfig = {
      w: width,
      h: height,
      defaultConfig: {},
    };
    switch (widgetType) {
      case 'SingleImg':
        const suffix = url.split('.').pop();
        widgetConfig.defaultConfig = {
          backgroundImg: suffix === 'svg' ? '' : url,
          imgType: suffix === 'svg' ? 'svg' : 'image',
          svg: suffix === 'svg' ? url : '',
          svgColor: '#d9d9d9',
          ...config,
        };
        break;
      case 'BgBox':
        widgetConfig.defaultConfig = {
          bgStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
          borderStyle: {
            borderType: 'image',
            imageBorder: {
              url,
              ...config,
            },
          },
        };
        break;
      case 'VideoPlayer':
        widgetConfig.defaultConfig = {
          src: url,
          ...config,
        };
        break;
    }
    return widgetConfig;
  }, [widgetType]);

  return (
    <DragItem name={name} cover={cover || url} type={widgetType} dnConfig={dnConfig}>
      <div className="title">{name}</div>
      <div className="cover-img">
        <img src={cover || url} alt={name} />
      </div>
    </DragItem>
  );
};

const RenderBgBorder: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <>
      <div style={{ padding: '10px 10px 0' }}>
        <Select
          value={active}
          style={{ width: '100%' }}
          popupClassName="datav-dropdown"
          onChange={(e) => {
            setActive(e);
          }}
        >
          <Select.Option value="all">全部</Select.Option>
          <Select.Option value="largeTitle">大标题背景框</Select.Option>
          <Select.Option value="smallTitle">小标题背景框</Select.Option>
          <Select.Option value="contentBg">内容背景框</Select.Option>
          <Select.Option value="pageBg">页面背景框</Select.Option>
        </Select>
      </div>

      {(active === 'all' || active === 'largeTitle') && (
        <>
          <li className="render-material-item-title">大标题背景框</li>
          <ul className="render-material-item render-bg-border">
            {titleBgBorder.map((m, i) => (
              <li key={i}>
                <RenderDragItem height={122} {...m} />
              </li>
            ))}
          </ul>
        </>
      )}
      {(active === 'all' || active === 'smallTitle') && (
        <>
          <li className="render-material-item-title">小标题背景框</li>
          <ul className="render-material-item render-bg-border">
            {smallTitleBgBorder.map((m, i) => (
              <li key={i}>
                <RenderDragItem height={122} {...m} />
              </li>
            ))}
          </ul>
        </>
      )}
      {(active === 'all' || active === 'contentBg') && (
        <>
          <li className="render-material-item-title">内容背景框</li>
          <ul className="render-material-item render-bg-border">
            {bgBorderData.map((m, i) => (
              <li key={i}>
                <RenderDragItem width={300} height={300} {...m} />
              </li>
            ))}
          </ul>
        </>
      )}
      {(active === 'all' || active === 'pageBg') && (
        <>
          <li className="render-material-item-title">页面背景框</li>
          <ul className="render-material-item render-bg-border">
            {pageBgBorder.map((m, i) => (
              <li key={i}>
                <RenderDragItem {...m} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const RenderBgImg: React.FC = () => {
  return (
    <ul className="render-material-item render-bg-img">
      {bgImg.map((m, i) => (
        <li key={i}>
          <RenderDragItem {...m} />
        </li>
      ))}
    </ul>
  );
};

const RenderDecorateStrip: React.FC = () => {
  return (
    <ul className="render-material-item render-decorate-strip">
      {decorateData.map((m, i) => (
        <li key={i}>
          <RenderDragItem width={380} height={24} {...m} />
        </li>
      ))}
    </ul>
  );
};

const RenderVideo: React.FC = () => {
  return (
    <ul className="render-material-item render-bg-img">
      {videoData.map((m, i) => (
        <li key={i}>
          <RenderDragItem type={'VideoPlayer'} width={380} height={220} {...m} />
        </li>
      ))}
    </ul>
  );
};
