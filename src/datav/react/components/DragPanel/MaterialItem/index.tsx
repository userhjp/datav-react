import React, { useMemo, useState } from 'react';
import { DragItem } from '../DragItem';
import { bgImg } from './bgImgData';
import { decorateData } from './decorateData';
import { bgBorderData } from './bgBorderData';
import { videoData } from './videoData';
import './index.less';
import { pageBgBorder } from './pageBorderData';
import { titleBgBorder } from './titleBorderData';

//  'video' | 'icon' | 'bgImg' | 'bgBorder' | 'decorate'
const materialType = [
  { name: '视频', type: 'video' },
  { name: '图标', type: 'icon' },
  // { name: '点缀', children: [] },
  { name: '背景图', type: 'bgImg' },
  { name: '背景框', type: 'bgBorder' },
  { name: '装饰条', type: 'decorate' },
  // { name: '插画', children: [] },
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
  type: 'SingleImg' | 'BgBox' | 'VideoPlayer';
  cover?: string;
  url: string;
  width?: number;
  height?: number;
  defaultConfig?: { [key: string]: any };
}> = (props) => {
  const { name, type, cover, width, height, url, defaultConfig = {} } = props;

  const dnConfig: any = useMemo(() => {
    switch (type) {
      case 'SingleImg':
        return {
          w: width,
          h: height,
          defaultConfig: {
            backgroundImg: url,
            imgType: 'image',
            svg: '',
            svgColor: '#d9d9d9',
            ...defaultConfig,
          },
        };
      case 'BgBox':
        return {
          w: width,
          h: height,
          defaultConfig: {
            bgStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
            },
            borderStyle: {
              borderType: 'image',
              imageBorder: {
                url,
                ...defaultConfig,
              },
            },
          },
        };
      case 'VideoPlayer':
        return {
          w: width,
          h: height,
          defaultConfig: {
            src: url,
          },
        };
      default:
        return {};
    }
  }, [type]);

  return (
    <DragItem name={name} cover={cover || url} type={type} dnConfig={dnConfig}>
      <div className="title">{name}</div>
      <div className="cover-img">
        <img src={cover || url} alt={name} />
      </div>
    </DragItem>
  );
};

const RenderBgBorder: React.FC = () => {
  return (
    <>
      <li className="render-material-item-title">大标题背景框</li>
      <ul className="render-material-item render-bg-border">
        {titleBgBorder.map((m, i) => (
          <li key={i}>
            <RenderDragItem name={m.name} height={122} type={'SingleImg'} cover={m.cover} url={m.url} />
          </li>
        ))}
      </ul>
      <li className="render-material-item-title">内容背景框</li>
      <ul className="render-material-item render-bg-border">
        {bgBorderData.map((m, i) => (
          <li key={i}>
            <RenderDragItem
              name={m.name}
              type={'BgBox'}
              cover={m.cover}
              url={m.url}
              width={300}
              height={300}
              defaultConfig={{
                slice: m.slice,
                width: m.width,
              }}
            />
          </li>
        ))}
      </ul>
      <li className="render-material-item-title">页面背景框</li>
      <ul className="render-material-item render-bg-border">
        {pageBgBorder.map((m, i) => (
          <li key={i}>
            <RenderDragItem name={m.name} type={'SingleImg'} cover={m.cover} url={m.url} />
          </li>
        ))}
      </ul>
    </>
  );
};

const RenderBgImg: React.FC = () => {
  return (
    <ul className="render-material-item render-bg-img">
      {bgImg.map((m, i) => (
        <li key={i}>
          <RenderDragItem name={m.name} type={'SingleImg'} url={m.url} />
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
          <RenderDragItem name={m.name} type={'SingleImg'} url={m.url} width={380} height={24} />
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
          <RenderDragItem name={m.name} type={'VideoPlayer'} cover={m.cover} url={m.url} width={380} height={220} />
        </li>
      ))}
    </ul>
  );
};
