import React from 'react';

import {
  Scrollbars,
  ThumbVertical,
  TrackVertical,
  View,
} from './styled';

export default ({children, height, thumbColor}) => {
  const renderThumbVertical = props => <ThumbVertical thumbColor={thumbColor} {...props} />;
  const renderTrackVertical = ({ ...style, ...props }) => <TrackVertical className="track-vertical" style={{ ...style }} {...props} />;
  const renderView = props => <View {...props} />;
  
  return (
    <Scrollbars
      autoHeight
      hideTracksWhenNotNeeded
      autoHeightMin={height}
      autoHeightMax={height}
      renderThumbVertical={renderThumbVertical}
      renderTrackVertical={renderTrackVertical}
      renderView={renderView}
    >
      {children}
    </Scrollbars>
  );
};