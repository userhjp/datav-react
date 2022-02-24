import React from 'react';
import { registerWidgetConfig } from '@/datav/core';
import { VideoPlayerSchema } from './schema';

export const VideoPlayer = React.lazy(() => import('./preview'));

registerWidgetConfig(VideoPlayer, {
  schema: VideoPlayerSchema,
});
