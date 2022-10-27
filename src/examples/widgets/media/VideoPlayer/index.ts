import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { VideoPlayerSchema } from './schema';

export const VideoPlayer = registerWidgetConfig(
  React.lazy(() => import('./preview')),
  {
    taxonPath: '媒体.视频播放器',
    cover: '/static/menuCover/媒体/视频播放器.png',
    schema: VideoPlayerSchema,
  }
);
