import { InputNumber, Slider } from 'antd';
import React from 'react';
import './index.less';

type USliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  tooltipVisible: boolean;
};

export const USlider: React.FC<USliderProps> = (props) => {
  const { min = 0, max = 1, step = 0.01, tooltipVisible = false } = props;
  return (
    <div className="u-slider">
      <Slider min={min} max={max} step={step} tooltipVisible={tooltipVisible} {...props} />
      <div className="u-slider-num">
        <div className="min-num u-num">0</div>
        <div>
          <InputNumber min={min} max={max} step={step} precision={2} {...props} />
        </div>
        <div className="max-num u-num">1</div>
      </div>
    </div>
  );
};
