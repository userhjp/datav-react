import { useScreen, useViewport } from '../../../../hooks';
import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import { Dropdown, Menu, Slider } from 'antd';
import React from 'react';
import { IconWidget } from '../../../IconWidget';
import './index.less';

const menus = [
  { label: '200%', value: 2.0 },
  { label: '150%', value: 1.5 },
  { label: '100%', value: 1.0 },
  { label: '50%', value: 0.5 },
  { label: '自适应', value: 'auto' },
];

const ScreenSelectd: React.FC = observer(() => {
  const screen = useScreen();
  const viewport = useViewport();

  const handleScaleClick = (type: 0 | 1) => {
    let scale = toJS(screen.scale);
    if (type === 1) {
      scale += 0.1;
      if (scale >= 2) scale = 2;
    } else {
      scale -= 0.1;
      if (scale <= 0.18) scale = 0.18;
    }
    screen.setScale(scale);
  };

  const handleChange = (val: string | number) => {
    if (val === 'auto') {
      viewport.autoScale();
    } else {
      screen.setScale(+val);
    }
  };
  const renderMenu = () => {
    return (
      <Menu>
        {menus.map((item, i) => (
          <Menu.Item key={i} danger onClick={() => handleChange(item.value)}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className="screen-selectd">
      <Dropdown overlay={renderMenu} overlayClassName="screen-selectd-dropdown" trigger={['click']}>
        <span className="dropdown">
          {`${Math.round(screen.scale * 100)}%`}&nbsp;
          <IconWidget infer="Expand" style={{ fontSize: 10 }} />
        </span>
      </Dropdown>
      <IconWidget infer="MinusSquare" onClick={() => handleScaleClick(0)} style={{ fontSize: 14 }} />
      &nbsp;
      <Slider min={0.18} max={2} step={0.01} onChange={screen.setScale} value={screen.scale} tipFormatter={null} />
      <IconWidget infer="PlusSquare" onClick={() => handleScaleClick(1)} style={{ fontSize: 14 }} />
    </div>
  );
});

export default ScreenSelectd;
