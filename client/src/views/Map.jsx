import React from 'react';
import Track from '../components/Track';

function Map({ displayedTrack }) {
  return (
    (displayedTrack)
    && (
    <Track
      geojson={displayedTrack}
      color="red"
    />
    )
  );
}

export default Map;
