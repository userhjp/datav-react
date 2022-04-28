import React, { useEffect, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import QRCode from 'qrcode';
import './styles.less';

const QrCodeWidget: React.FC<IWidgetProps> = ({ data, options, attr }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const generateQR = async (text: string) => {
    try {
      await QRCode.toCanvas(canvasRef.current, text, { errorCorrectionLevel: 'M', width: attr.w, ...options });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!data?.content) return;
    generateQR(data.content);
  }, [data, options, attr.w, attr.h]);

  return (
    <div className="widget-qr-code">
      <canvas style={{ width: '100%', height: '100%' }} ref={canvasRef} />
    </div>
  );
};

export default QrCodeWidget;
