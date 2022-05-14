import { InputNumber, Slider as AntdSlider } from 'antd';
import React from 'react';
import './index.less';

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  precision: number;
  tooltipVisible: boolean;
};

export const Slider: React.FC<SliderProps> = (props) => {
  const { min = 0, max = 1, step = 0.01, precision = 2, tooltipVisible = false } = props;
  return (
    <div className="settings-slider">
      <div className="settings-slider-slider">
        <AntdSlider min={min} max={max} step={step} tooltipVisible={tooltipVisible} {...props} />
      </div>
      <div className="settings-slider-number">
        <InputNumber min={min} max={max} step={step} precision={precision} {...props} />
      </div>
    </div>
  );
};
