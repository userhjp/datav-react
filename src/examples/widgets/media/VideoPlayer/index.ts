import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { VideoPlayerSchema } from './schema';

export const VideoPlayer = React.lazy(() => import('./preview'));

registerWidgetConfig(VideoPlayer, {
  taxonPath: '媒体.视频播放器',
  cover: '/menuCover/媒体/视频播放器.png',
  schema: VideoPlayerSchema,
});
