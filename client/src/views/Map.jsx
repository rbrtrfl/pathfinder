import React, { useEffect, useState } from 'react';
import Track from '../components/Track';
import { findSelectedTrack } from '../tools/Helpers';

function Map({ selectedTrack, myTracks }) {
  const [displayedTrack, setDisplayedTrack] = useState(null);

  useEffect(async () => {
    if (selectedTrack) {
      const geojson = await findSelectedTrack(selectedTrack, myTracks);
      setDisplayedTrack(geojson);
    }
  }, [selectedTrack]);

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
