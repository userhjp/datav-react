import React, { useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { isUrl } from '@/datav/shared';
import { useDebounceEffect } from 'ahooks';
const Iframe: React.FC<IWidgetProps> = ({ options }) => {
  const [url, setUrl] = useState();
  useDebounceEffect(
    () => {
      setUrl(options.url);
    },
    [options.url],
    {
      wait: 1000,
    }
  );
  if (!url || !isUrl(url))
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        {url ? 'Iframe 无效的URL' : 'Iframe URL为空'}
      </div>
    );

  return <iframe height="100%" width={'100%'} seamless frameBorder={0} src={url} />;
};

export default Iframe;
