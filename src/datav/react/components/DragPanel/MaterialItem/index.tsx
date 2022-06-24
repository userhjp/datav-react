import React, { useMemo, useState } from 'react';
import { DragItem } from '../DragItem';
import { SettingsEmpty } from '../../../settings-form/components';
import { useMaterial } from '@/datav/react/hooks';
import { IDvMaterial } from '@/datav/react/interface';
import { bgImg } from './bgImgData';
import { decorateData } from './decorateData';
import { bgBorderData } from './bgBorderData';
import './index.less';

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
        {/* {activateList.length > 0 ? <></> : <SettingsEmpty title="暂无可用素材" />} */}
      </div>
    </div>
  );
};
export default MaterialItem;

const RenderBgBorder: React.FC = () => {
  return (
    <>
      <li className="render-material-item-title">内容背景框</li>
      <ul className="render-material-item render-bg-border">
        {bgBorderData.map((m, i) => (
          <li key={i}>
            <DragItem cover={m.url} {...m} type="SingleImg">
              <div className="title">{m.name}</div>
              <div className="cover-img">
                <img src={m.url} alt={m.name} />
              </div>
            </DragItem>
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
          <DragItem
            cover={m.url}
            {...m}
            type="SingleImg"
            dnConfig={
              {
                defaultConfig: {
                  backgroundImg: m.url,
                  imgType: 'image',
                  svg: '',
                  svgColor: '#d9d9d9',
                },
              } as any
            }
          >
            <div className="title">{m.name}</div>
            <div className="cover-img">
              <img src={m.url} alt={m.name} />
            </div>
          </DragItem>
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
          <DragItem
            cover={m.url}
            {...m}
            type="SingleImg"
            dnConfig={
              {
                h: 24,
                w: 380,
                defaultConfig: {
                  backgroundImg: '',
                  imgType: 'svg',
                  svg: m.url,
                  svgColor: '#d9d9d9',
                },
              } as any
            }
          >
            <div className="title">{m.name}</div>
            <div className="cover-img">
              <img src={m.url} alt={m.name} />
            </div>
          </DragItem>
        </li>
      ))}
    </ul>
  );
};
