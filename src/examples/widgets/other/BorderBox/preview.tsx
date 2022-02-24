import React, { useMemo } from 'react';
import { IWidgetNode } from '@/datav/react/interface';
import './styles.less';

export const presetImages = [
  {
    value: 'box1',
    label: '框1',
    src: 'https://files.pengxiaotian.com/bg-box/box1-1540-292.png',
    border: {
      width: '4px 805px 281px 730px',
      outset: '0',
      slice: '4 805 281 730 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box2',
    label: '框2',
    src: 'https://files.pengxiaotian.com/bg-box/box2-1310-182.png',
    border: {
      width: '65px 740px 88px 560px',
      outset: '0',
      slice: '65 740 88 561 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box3',
    label: '框3',
    src: 'https://files.pengxiaotian.com/bg-box/box3-1390-146.png',
    border: {
      width: '101px 690px 35px 693px',
      outset: '0',
      slice: '101 690 35 693 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box4',
    label: '框4',
    src: 'https://files.pengxiaotian.com/bg-box/box4-1270-840.png',
    border: {
      width: '423px 606px 410px 652px',
      outset: '0',
      slice: '423 606 410 652 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box5',
    label: '框5',
    src: 'https://files.pengxiaotian.com/bg-box/box5-1168-686.png',
    border: {
      width: '220px 664px 460px 500px',
      outset: '0',
      slice: '220 664 460 500 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box6',
    label: '框6',
    src: 'https://files.pengxiaotian.com/bg-box/box6-1186-616.png',
    border: {
      width: '288px 500px 272px 680px',
      outset: '0',
      slice: '288 500 272 680 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box7',
    label: '框7',
    src: 'https://files.pengxiaotian.com/bg-box/box7-580-742.png',
    border: {
      width: '71px 23px',
      outset: '0',
      slice: '71 23 fill',
      repeat: 'stretch',
    },
  },
  {
    value: 'box8',
    label: '框8',
    src: 'https://files.pengxiaotian.com/bg-box/box8-592-131.png',
    border: {
      width: '17px 24px 18px 19px',
      outset: '0',
      slice: '17 24 18 19 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box9',
    label: '框9',
    src: 'https://files.pengxiaotian.com/bg-box/box9-524-282.png',
    border: {
      width: '56px 4px 76px 393px',
      outset: '0',
      slice: '56 4 76 393 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box10',
    label: '框10',
    src: 'https://files.pengxiaotian.com/bg-box/box10-731-407.png',
    border: {
      width: '152px 27px 127px 354px',
      outset: '0',
      slice: '152 27 127 354 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box11',
    label: '框11',
    src: 'https://files.pengxiaotian.com/bg-box/box11-492-335.png',
    border: {
      width: '15px 11px 16px 8px',
      outset: '0',
      slice: '15 11 16 8 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box12',
    label: '框12',
    src: 'https://files.pengxiaotian.com/bg-box/box12-986-212.png',
    border: {
      width: '29px 107px 109px 16px',
      outset: '0',
      slice: '29 107 109 16 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box13',
    label: '框',
    src: 'https://files.pengxiaotian.com/bg-box/box13.png',
    border: {
      width: '45px 103px 51px 29px',
      outset: '0',
      slice: '45 103 51 29 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box14',
    label: '框14',
    src: 'https://files.pengxiaotian.com/bg-box/box14-689-232.png',
    border: {
      width: '46px 305px 117px 33px',
      outset: '0',
      slice: '46 305 117 33 fill',
      repeat: 'repeat',
    },
  },
  {
    value: 'box15',
    label: '框15',
    src: 'https://files.pengxiaotian.com/bg-box/box15.png',
    border: {
      width: '14px 100px',
      outset: '0',
      slice: '14 100',
      repeat: 'stretch',
    },
  },
  {
    value: 'box16',
    label: '框16',
    src: 'https://files.pengxiaotian.com/bg-box/box16-116-115.png',
    border: {
      width: '14px 100px',
      outset: '0',
      slice: '14 100',
      repeat: 'stretch',
    },
  },
  {
    value: 'box17',
    label: '框17',
    src: 'https://files.pengxiaotian.com/bg-box/box17.png',
    border: {
      width: '32px 37px',
      outset: '0',
      slice: '32 37 fill',
      repeat: 'stretch',
    },
  },
  {
    value: 'box18',
    label: '框18',
    src: 'https://files.pengxiaotian.com/bg-box/box18-126-154.png',
    border: {
      width: '71px 23px',
      outset: '0',
      slice: '71 23',
      repeat: 'stretch',
    },
  },
];

const BorderBox: React.FC<IWidgetNode> = ({ options }) => {
  const style: React.CSSProperties = useMemo(() => {
    const img = presetImages.find((m) => m.value === options.borderImg);
    if (!img) return {};

    return {
      background: 'none',
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: 1,
      borderImage: `url(${img.src}) ${img.border.slice} / ${img.border.width} / ${img.border.outset} ${img.border.repeat}`,
    };
  }, [options]);

  return <div style={style} className="widget-border-box" />;
};

export default BorderBox;
