import { observer } from '@formily/react';
import React from 'react';
import './index.less';

type WidgetInfoProps = {
  title: string;
  value: {
    name: string;
    ver: string;
    type: string;
  };
};

export const WidgetInfo: React.FC<WidgetInfoProps> = observer((props) => {
  const { value = { name: '', ver: '', type: '' } } = props;
  const { name, ver, type } = value;
  return (
    <div className="widget-info">
      <div className="widget-title">
        {name}
        <div className="sub-title">
          {type} | v{ver}
        </div>
      </div>
    </div>
  );
});
